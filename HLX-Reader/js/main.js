function LoadFile() {
	var input = document.getElementById('hlxFile');
	var file = input.files[0];
	var fileReader = new FileReader();
	fileReader.onload = ProcessFile;
	fileReader.readAsText(file);

	//$.getJSON('/hlx/BeEnthroned.hlx', function (data) {
	//	EnumerateObject(data, document.getElementById('root'));
	//});
}

function ProcessFile(data) {
	var result = data.target.result;
	var json = JSON.parse(result);
	EnumerateObject(json, document.getElementById('root'));
}

function EnumerateObject(json, root, parent) {
	for(var x in json) {
		var li = document.createElement('LI');
		if (typeof json[x] === 'object') {
			var newId = GenerateId();

			var a = document.createElement('A');
			a.innerText = x;
			a.dataset.toggle = 'collapse';
			a.setAttribute('href', '#' + newId);
			a.setAttribute('role', 'button');
			a.setAttribute('aria-expanded', 'false');
			a.setAttribute('aria-controls', x);
			a.classList.add('font-weight-bold');
			li.appendChild(a);

			var ul = document.createElement('UL');
			ul.classList.add('collapse');
			ul.id = newId;
			ul.dataset.parent = '#' + root.id;
			li.appendChild(ul);
			root.appendChild(li);

			EnumerateObject(json[x], ul);
		} else {
			var label = document.createElement('LABEL');
			label.innerText = x + ':';
			label.classList.add('font-weight-bold');
			label.classList.add('mr-2');
			li.appendChild(label);

			var text = document.createTextNode(json[x]);
			li.appendChild(text);

			root.appendChild(li);
		}
	}
}

function GenerateId() {
	return '_' + Math.random().toString(36).substr(2, 9);
};
