const quote = document.querySelector('.quote p'),
	quoteMaster = document.querySelector('.quotemaster'),
	btn = document.querySelector('.btn'),
	clip = document.querySelector('ul li:nth-child(2)'),
	text2speech = document.querySelector('ul li:nth-child(1)'),
	tags = document.querySelectorAll('.tags'),
	twitter = document.querySelector('ul li:nth-child(3)'),
	topics = [];

let content = 'hello';

document.addEventListener('DOMContentLoaded', randomQuote);
btn.addEventListener('click', randomQuote);
clip.addEventListener('click', copyText);
text2speech.addEventListener('click', voicess);
twitter.addEventListener('click', tweet);

tags.forEach((item, index, array) => {
	item.addEventListener('click', () => {
		item.classList.toggle('active');
		if (item.classList.contains('active')) {
			if (!topics.includes(item.getAttribute('data-top'))) {
				topics.push(item.getAttribute('data-top'));
			}
		} else {
			if (topics.includes(item.getAttribute('data-top'))) {
				topics.splice(topics.indexOf(item.getAttribute('data-top')), 1);
			}
		}
		randomQuote();
	});
});

async function randomQuote() {
	const params = new URLSearchParams({
		category: 'happiness',
	});
	const response = await fetch(`https://api.api-ninjas.com/v1/quotes`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-Api-Key': '3slqxREN0JcqUezItQgH/g==ozAyg0SmRCVXzZtR',
		},
	});
	const data = await response.json();
	content = data[0].quote;
	quote.innerHTML = data[0].quote;
	quoteMaster.innerHTML = data[0].author;
	speechSynthesis.cancel();
	clip.firstElementChild.classList.remove('fa-check');
	clip.firstElementChild.classList.add('fa-copy');
	if (topics.length == 0) {
		tags[0].classList.add('active');
	}
}

function copyText() {
	navigator.clipboard.writeText(content);
	clip.firstElementChild.classList.add('fa-check');
	clip.firstElementChild.classList.remove('fa-copy');
}

function voicess() {
	try {
		let utterance = new SpeechSynthesisUtterance(content);
		utterance.volume = 1;
		speechSynthesis.speak(utterance);
	} catch (e) {
		console.log(e);
	}
}
function tweet() {
	window.open(
		`https://twitter.com/compose/tweet?url=${content}`,
		'_blank',
		'width=800,height=400'
	);
}
