// Templates
var templates = {
	'current_grade': function (module) {
		var id = 'grade_' + module.code;
	
		return '<li class="append field">' +
			   '    <label class="inline" for="' + id + '">' + module.code + ' - ' + module.name + '</label>' +
			   '    <input id="' + id + '" class="settings_grade xnarrow text input" type="text" placeholder="' + module.short_name + '" data-module="' + module.code + '">' +
			   '    <span class="adjoined">%</span>' +
			   '</li>';
	},
	'invalid_grade': function (module) {
		return '<div style="display: none" class="invalid_' + module.code + ' danger alert">Invalid percentage - must be 0-' + module.weighting.coursework + '%</div>'
	},
	'module_result': function (module, pc) {
		return '<tr>' +
		       '     <td>' + module.name + '</td>' +
		       '     <td>' + module.weighting.exam + '%</td>' +
		       '     <td class="result result_' + module.code + '_70">N/A</td>' +
		       '     <td class="result result_' + module.code + '_60">N/A</td>' +
		       '     <td class="result result_' + module.code + '_50">N/A</td>' +
		       '     <td class="result result_' + module.code + '_40">N/A</td>' +
			   '</tr>';
	},
};

var modules = {
	'COMP2448': {
		'code': 'COMP2448',
		'name': 'Information Systems and Databases',
		'short_name': 'Info Sys & DB',
		'weighting': {
			'exam': 60
		}
	},
	'COMP2449': {
		'code': 'COMP2449',
		'name': 'Networking and IT Management',
		'short_name': 'Net & IT Man',
		'weighting': {
			'exam': 60
		}
	},
	'COMP2542': {
		'code': 'COMP2542',
		'name': 'Graphical User Interfaces',
		'short_name': 'GUIs',
		'weighting': {
			'exam': 70
		}
	},
	'COMP2645': {
		'code': 'COMP2645',
		'name': 'Strategy and Security',
		'short_name': 'Strat & Sec',
		'weighting': {
			'exam': 80
		}
	},
	'COMP2646': {
		'code': 'COMP2646',
		'name': 'Business Applications',
		'short_name': 'Bus Apps',
		'weighting': {
			'exam': 80
		}
	}
};

// Clear settings form loading messages
$('#form ul').empty();
$('#results_table tbody').empty();
	
$.each(modules, function (index, module) {
	// Calculate the other weighting
	if (module.weighting.exam && !module.weighting.coursework) {
	module.weighting.coursework = 100 - module.weighting.exam;
	} else if (!module.weighting.exam && module.weighting.coursework) {
		module.weighting.exam = 100 - module.weighting.coursework;
	}
		
	// Build current grade form
	$('#form ul').append(templates.current_grade(module));
		
	// Build the results table entry
	$('#results_table tbody').append(templates.module_result(module));
});
	
var valid_regex = /^[0-9]+$/;
	
// Validate grades
$('.settings_grade').keyup(function () {
	// Module
	var module = modules[$(this).attr('data-module')];
	
	// Check for blank num
	if ($(this).val() == '') {
		// Hide error
		$('.invalid_' + module.code).slideUp(500, function () {
			$(this).remove();
		});
		
		$('[class*=result_' + module.code + ']').html('N/A');
	} else {
		// Validate number
		if (!$(this).val().match(valid_regex) || parseFloat($(this).val()) > module.weighting.coursework) {
			// If not showing, display invalid message
			if (!$('.invalid_' + module.code).is('*')) {
				$(this).parent().append(templates.invalid_grade(module));
				$('.invalid_' + module.code).slideDown(500);
				$('[class*=result_' + module.code + ']').html('N/A');
			}
		} else {
			$('.invalid_' + module.code).slideUp(500, function () {
				$(this).remove();
			});
		
			// Calculate results
			var calc = [70, 60, 50, 40];
			var pc_val = parseFloat($(this).val());
		
			calc.forEach(function (goal) {
				var req = Math.round((goal - pc_val) / module.weighting.exam * 100);
				var result_box = $('.result_' + module.code + '_' + goal);
			
				if (req > 100) {
					result_box.html('N/A');
				} else {
					result_box.html(req + '%');
				}
			});
		}
	}
});

