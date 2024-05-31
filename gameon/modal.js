// DOM Elements
const body = document.querySelector('body');
const main = document.querySelector('main');
const modalBtn = document.querySelectorAll('.modal-btn');
const modalbg = document.querySelector('.bground');
const closeM = document.querySelector('.close');
const form = document.querySelector('form[name="reserve"]');
const inputs = document.querySelectorAll('input');
const firstname = document.getElementById('first');
const lastname = document.getElementById('last');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const quantity = document.getElementById('quantity');
const cities = document.querySelectorAll("input[name='location']");
const conditions = document.getElementById('checkbox1');

// Burger
function editNav() {
	const x = document.getElementById('myTopnav');
	if (x.className === 'topnav') {
		x.className += ' responsive';
	} else {
		x.className = 'topnav';
	}
}

// Launch modal form
function launchModal() {
	modalbg.style.display = 'flex';
	body.style.overflow = 'hidden';
}

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// Close modal form
function closeModal() {
	modalbg.style.display = 'none';
	body.style.overflow = 'auto';
	inputs.forEach((input) => {
		hideErrorMessage(input);
	});
}

// Close modal event
closeM.addEventListener('click', closeModal);

// Modal form

// Function to display an error message
function displayErrorMessage(element, message) {
	element.parentElement.setAttribute('data-error-visible', 'true');
	element.parentElement.setAttribute('data-error', message);
}

// Function to hide an error message
function hideErrorMessage(element) {
	element.parentElement.removeAttribute('data-error-visible');
	element.parentElement.removeAttribute('data-error');
}

// Validation for the first name and the last name
function validateFirstLast(firstLast, errorMessage) {
	if (firstLast.value.trim().length < 2) {
		displayErrorMessage(firstLast, errorMessage);
		return false;
	}

	hideErrorMessage(firstLast);
	return true;
}

// Validation for the email
function validateEmail(email) {
	const emailValue = email.value.trim();
	const emailRegExp = new RegExp(
		'^[a-zA-Z0-9._-]{2,64}@[a-zA-Z0-9.-]{2,252}\\.[a-z]{2,4}$',
	);
	if (!emailRegExp.test(emailValue)) {
		displayErrorMessage(
			email,
			'Veuillez renseigner une adresse mail valide.',
		);

		return false;
	}

	hideErrorMessage(email);
	return true;
}

// Calculation of the user's age
function calculateUserAge(birthdate) {
	const birthDate = new Date(birthdate.value.trim());
	const today = new Date();
	let age = today.getFullYear() - birthDate.getFullYear();
	const month = today.getMonth() - birthDate.getMonth();
	if (
		month < 0 ||
		(month === 0 && today.getDate() < birthDate.getDate())
	) {
		age--;
	}

	return age;
}

// Validation for the birthdate
function validateBirthdate(birthdate) {
	const userAge = calculateUserAge(birthdate);
	if (userAge < 18 || userAge > 99 || birthdate.value === '') {
		displayErrorMessage(
			birthdate,
			'Vous devez avoir entre 18 et 99 ans pour participer',
		);

		return false;
	}

	hideErrorMessage(birthdate);
	return true;
}

// Validation for the quantity
function validateQuantity(quantity) {
	const quantityValue = quantity.value.trim();
	if (
		quantityValue < 0 ||
		quantityValue > 99 ||
		quantityValue === ''
	) {
		displayErrorMessage(
			quantity,
			'Veuillez renseigner un nombre entre 0 et 99',
		);

		return false;
	}

	hideErrorMessage(quantity);
	return true;
}

// Validation for the selected city
function validateCitySelected(cities) {
	for (let i = 0; i < cities.length; i++) {
		if (cities[i].checked) {
			hideErrorMessage(cities[0]);
			return true;
		}
	}

	displayErrorMessage(cities[0], 'Veuillez sélectionner une ville');
	return false;
}

// Validation for the terms of use
function validateConditions(conditions) {
	if (!conditions.checked) {
		displayErrorMessage(
			conditions,
			"Vous devez accepter les conditions d'utilisation",
		);

		return false;
	}

	hideErrorMessage(conditions);
	return true;
}

// Validation of the form
function validateForm() {
	const isFirstNameValid = validateFirstLast(
		firstname,
		'Veuillez entrer 2 caractères ou plus pour le champ du prénom.',
	);
	const isLastNameValid = validateFirstLast(
		lastname,
		'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
	);
	const isEmailValid = validateEmail(email);
	const isBirthdateValid = validateBirthdate(birthdate);
	const isQuantityValid = validateQuantity(quantity);
	const isCitySelected = validateCitySelected(cities);
	const isConditionsValid = validateConditions(conditions);

	return (
		isFirstNameValid &&
		isLastNameValid &&
		isEmailValid &&
		isBirthdateValid &&
		isQuantityValid &&
		isCitySelected &&
		isConditionsValid
	);
}

// Display and close success modal
function showSuccessModal() {
	const container = document.createElement('div');
	container.classList.add('bground');
	container.style.display = 'flex';
	main.appendChild(container);
	container.innerHTML = `
		<div class="content content-success">
			<span class="close close-btn"></span>
			<div class="modal-body">
				<h2>Merci pour<br> votre inscription</h2>
				<button class="btn-submit modal-btn close-btn">Fermer</button>
			</div>
		</div>
    `;

	const closeBtns = container.querySelectorAll('.close-btn');
	closeBtns.forEach((closeBtn) => {
		closeBtn.addEventListener('click', () => {
			container.remove();
			body.style.overflow = 'auto';
		});
	});
}

// Loading the full DOM before attaching the onsubmit event to the form
document.addEventListener('DOMContentLoaded', () => {
	form.onsubmit = validate;
});

// Form submission validation and handling
function validate(e) {
	e.preventDefault();

	if (validateForm()) {
		showSuccessModal();
		modalbg.style.display = 'none';
		body.style.overflow = 'hidden';
		form.reset();
	}
}
