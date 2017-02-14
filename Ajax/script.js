var xhr = new XMLHttpRequest(); // 0

	xhr.open('GET', 'data.json', false); // 1

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			//document.querySelector('#view').innerText += xhr.responseText;
			var data = JSON.parse(xhr.responseText);
			var innerTable = ' ';

			data.forEach(function(obj) {
				innerTable += `
				<tr>
				<td><img src="${obj.picture}" alt="${obj.name}"</td>
				<td>${obj.name}</td>
				<td>${obj.age}</td>
				<td>${obj.email}</td>
				<td>${obj.company}</td>
				<td>${obj.phone}</td>
				</tr>
				`;

				var table = `
				<table> 
				<tr>
				<th>Picture</th>
				<th>Name</th>
				<th>Age</th>
				<th>E-mail</th>
				<th>Company</th>
				<th>Phone</th>
				</tr>
				${innerTable}
				</table>
				`;

				jQuery('#view').html(table);
			});
		}
	}
xhr.send(); // 2, 3, 4 OK
	//console.log(xhr);