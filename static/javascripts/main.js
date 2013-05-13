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


// Gumby is ready to go
Gumby.ready(function() {
	console.log('Gumby is ready to go...', Gumby.debug());

	// placeholder polyfil
	if(Gumby.isOldie || Gumby.$dom.find('html').hasClass('ie9')) {
		$('input, textarea').placeholder();
	}
	
	var modules = {
		'COMP1345': {
			'code': 'COMP1345',
			'name': 'Models & Simulations',
			'short_name': 'Mods & Sims',
			'weighting': {
				'exam': 80
			}
		},
		'COMP1440': {
			'code': 'COMP1440',
			'name': 'Computer Systems',
			'short_name': 'Comp Sys',
			'weighting': {
				'exam': 70
			}
		},
		'COMP1745': {
			'code': 'COMP1745',
			'name': 'Web Development',
			'short_name': 'Web Dev',
			'weighting': {
				'exam': 50
			}
		},
		'COMP1551': {
			'code': 'COMP1551',
			'name': 'Core Programming',
			'short_name': 'Core Prog',
			'weighting': {
				'exam': 40
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
	$('.settings_grade').change(function () {
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
	
	// console.log(modules);
});

// Oldie document loaded
Gumby.oldie(function() {
	console.log("This is an oldie browser...");
});

Gumby.touch(function() {
	console.log("This is a touch enabled device...");
});

// Document ready
$(function() {

});

