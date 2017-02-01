var form = document.createElement('form');
form.setAttribute("name", "login");
form.setAttribute("action", "https://google.com");
form.setAttribute("onsubmit", "return function validate()");

var inputs = {
	age: {
		type: 'text',
		name: 'age',
		placeholder: 'Your age'
	},
	username: {
		type: 'text',
		name: 'username',
		placeholder: 'Your username: user_'
	},
	date: {
		type: 'text',
		name: 'date',
		placeholder: 'dd/mm/yyyy'
	},
	button: {
		type: 'submit',
		value: "Validate Me"
	}
}

document.body.appendChild(form);

function formInput(inputs) {
	for (var elements in inputs) {
		var input = document.createElement('input');
		var element = inputs[elements];
		for (var key in element) {
			input.setAttribute(key, element[key])
		}
		form.appendChild(input);
	}
}

formInput(inputs);

var form = document.querySelector('form');

form.addEventListener('submit', function validate(e) {
	e.preventDefault();
	if (checkAge(this.age.value) &&  checkName(this.username.value) && checkDate(this.date.value)) {
		window.location.href = "http://google.com";
	} else {
		alert("invalid data - age should contains only positive numbers, username should starts with user_ and date should be in format dd/mm/yyyy");
	}
});

function checkAge(userage) {
	var ageRegex = /^(0?[1-9]|[0-9][0-9])$/;
	return ageRegex.test(userage);
}

function checkName(username) {
	return (form.elements[1].value.indexOf("user_") == 0);
}

function checkDate(date) {
	var dateRegex = new RegExp("([0-9]{4}[/](0[1-9]|1[0-2])[/]([0-2]{1}[0-9]{1}|3[0-1]{1})|([0-2]{1}[0-9]{1}|3[0-1]{1})[/](0[1-9]|1[0-2])[/][0-9]{4})");
	return dateRegex.test(date);
}