(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();


function addMember(memberId, mail, platit, username) {

				if (memberId) {
				let tr = document.createElement('tr');
				tr.setAttribute('id', memberId);
				let td_one = document.createElement('td');
				td_one.setAttribute('scope', 'row');
				td_one.innerHTML = memberId;
				td_one.classList.add('text-truncate', 'text-nowrap');
				tr.appendChild(td_one)
				

				let td_two = document.createElement('td');
				td_two.innerHTML = username;
				td_two.classList.add('text-truncate', 'text-nowrap');
				tr.appendChild(td_two);


				let td_three = document.createElement('td');
				td_three.innerHTML = mail;
				td_three.classList.add('text-truncate', 'text-nowrap');
				tr.appendChild(td_three);
				
				
				let td_four = document.createElement('td');
				td_four.classList.add('text-truncate', 'text-nowrap');
				let div_platit = document.createElement('div');
				div_platit.classList.add('form-check', 'form-switch'); 
				let input_platit = document.createElement('input');
				input_platit.classList.add('form-check-input');
				input_platit.setAttribute('type', 'checkbox');
				input_platit.setAttribute('role', 'switch');
				input_platit.onchange = function() {
					updateStatus(this)
				}; 
				input_platit.checked = platit;
				div_platit.appendChild(input_platit);
				td_four.appendChild(div_platit);
				tr.appendChild(td_four);

				
				let td_five = document.createElement('td');
				td_five.classList.add('text-truncate', 'text-nowrap');
				let button_mail = document.createElement('button');
				button_mail.setAttribute('type', 'button');
				button_mail.classList.add('btn', 'btn-primary','btn-sm');
				button_mail.setAttribute('data-bs-toggle', 'modal');
				button_mail.setAttribute('data-bs-target', '#modal_change');
				button_mail.innerHTML = '<i class="bi bi-send"></i>';
				button_mail.onclick = function() {
					sendMailToMember(memberId, username, mail)
				};
				td_five.appendChild(button_mail);
				tr.appendChild(td_five);
				

				let td_six = document.createElement('td');
				td_six.classList.add('text-truncate', 'text-nowrap');
				let button_remove = document.createElement('button');
				button_remove.setAttribute('type', 'button');
				button_remove.classList.add('btn', 'btn-danger', 'btn-sm');
				button_remove.setAttribute('data-bs-toggle', 'modal');
				button_remove.setAttribute('data-bs-target', '#modal_change');
				button_remove.innerHTML = '<i class="bi bi-x-square"></i>';
				button_remove.onclick = function () {
					removeMembru(memberId, username)
				};
				td_six.appendChild(button_remove);
				tr.appendChild(td_six);
				document.querySelector('#fetchData').appendChild(tr);
				} else {
					let tr = document.createElement('tr');

					let td_one = document.createElement('td');
					td_one.setAttribute('scope', 'row');
					td_one.innerHTML = '-';
					td_one.setAttribute('style', 'top: 7px !important')
					tr.appendChild(td_one)

					let td_two = document.createElement('td');
					td_two.innerHTML = '-';
					tr.appendChild(td_two);

					let td_three = document.createElement('td');
					td_three.innerHTML = '-';
					tr.appendChild(td_three);

					let td_four = document.createElement('td');
					let div_platit = document.createElement('div');
					div_platit.classList.add('form-check', 'form-switch'); 
					let input_platit = document.createElement('input');
					input_platit.classList.add('form-check-input');
					input_platit.setAttribute('type', 'checkbox');
					input_platit.setAttribute('role', 'switch');
					input_platit.setAttribute('disabled', true);
					div_platit.appendChild(input_platit);
					td_four.appendChild(div_platit);
					tr.appendChild(td_four);

					let td_five = document.createElement('td');
					let button_mail = document.createElement('button');
					button_mail.setAttribute('type', 'button');
					button_mail.classList.add('btn', 'btn-primary','btn-sm');
					button_mail.setAttribute('data-bs-toggle', 'modal');
					button_mail.setAttribute('data-bs-target', '#modal_change');
					button_mail.innerHTML = '<i class="bi bi-send"></i>';
					button_mail.setAttribute('disabled', true);
					td_five.appendChild(button_mail);
					tr.appendChild(td_five);

					let td_six = document.createElement('td');
					let button_remove = document.createElement('button');
					button_remove.setAttribute('type', 'button');
					button_remove.classList.add('btn', 'btn-danger', 'btn-sm');
					button_remove.setAttribute('data-bs-toggle', 'modal');
					button_remove.setAttribute('data-bs-target', '#modal_change');
					button_remove.innerHTML = '<i class="bi bi-x-square"></i>';
					button_remove.setAttribute('disabled', true);
					td_six.appendChild(button_remove);
					tr.appendChild(td_six);

					document.querySelector('#fetchData').appendChild(tr);
				}

}

function addMemberStatus(memberId, mail, username, status_membru) {

	if (memberId) {
	let tr = document.createElement('tr');
	tr.setAttribute('id', memberId);
	let td_one = document.createElement('td');
	td_one.setAttribute('scope', 'row');
	td_one.innerHTML = memberId;
	td_one.classList.add('text-truncate', 'text-nowrap');
	tr.appendChild(td_one)
	

	let td_two = document.createElement('td');
	td_two.innerHTML = username;
	td_two.classList.add('text-truncate', 'text-nowrap');
	tr.appendChild(td_two);


	let td_three = document.createElement('td');
	td_three.innerHTML = mail;
	td_three.classList.add('text-truncate', 'text-nowrap');
	tr.appendChild(td_three);
	

	let td_four = document.createElement('td');
	td_four.classList.add('text-truncate', 'text-nowrap');
	let button_remove = document.createElement('button');
	button_remove.setAttribute('type', 'button');
	button_remove.setAttribute('data-bs-target', '#modal_change');
	button_remove.setAttribute('data-bs-toggle', 'modal');
	if(status_membru == 1) {
		button_remove.classList.add('btn', 'btn-danger', 'btn-sm');
		button_remove.innerHTML = '<i class="bi bi-x-square"></i>';
		button_remove.onclick = function () {removeMembru(memberId, username)};
		td_four.appendChild(button_remove);
	} else {
		button_remove.classList.add('btn', 'btn-success', 'btn-sm');
		button_remove.innerHTML = '<i class="bi bi-plus-square"></i>';
		button_remove.onclick = function () {addMemberDatabaseModal(username, mail)};
		td_four.appendChild(button_remove);
	}
	tr.appendChild(td_four);
	document.querySelector('#fetchData').appendChild(tr);

	} else {
		let tr = document.createElement('tr');

		let td_one = document.createElement('td');
		td_one.setAttribute('scope', 'row');
		td_one.innerHTML = '-';
		td_one.setAttribute('style', 'top: 7px !important')
		tr.appendChild(td_one)

		let td_two = document.createElement('td');
		td_two.innerHTML = '-';
		tr.appendChild(td_two);

		let td_three = document.createElement('td');
		td_three.innerHTML = '-';
		tr.appendChild(td_three);


		let td_four = document.createElement('td');
		let button_remove = document.createElement('button');
		button_remove.setAttribute('type', 'button');
		button_remove.classList.add('btn', 'btn-danger', 'btn-sm');
		button_remove.setAttribute('data-bs-toggle', 'modal');
		button_remove.setAttribute('data-bs-target', '#modal_change');
		button_remove.innerHTML = '<i class="bi bi-x-square"></i>';
		button_remove.setAttribute('disabled', true);
		td_four.appendChild(button_remove);
		tr.appendChild(td_four);

		document.querySelector('#fetchData').appendChild(tr);
	}

}

function modalChange (NameModal, arg1) {
	if (NameModal == 'sendMail'){
		document.getElementById('modal_title').innerHTML = 'Trimite E-mail';
		document.getElementById('modal_body').innerHTML = '<p>Esti sigur ca doresti sa trimiti un e-mail de reamintire lui <br>' + arg1 +'?</p>';
		document.getElementById('modal_footer').children[1].setAttribute('id', 'button_sendMail');
	}
	if (NameModal == 'remove') {
		console.log('remove')
		document.getElementById('modal_title').innerHTML = 'Sterge membru';
		document.getElementById('modal_body').innerHTML = '<p>Esti sigur ca doresti ca ' + arg1 +' sa fie clandestin?</p>';
		document.getElementById('modal_footer').children[1].setAttribute('id', 'button_stergeMembru');
	}
	if (NameModal == 'addMember') {
		console.log('addMember')
		document.getElementById('modal_title').innerHTML = 'Adauga membrul inapoi';
		document.getElementById('modal_body').innerHTML = '<p>Esti sigur ca doresti ca ' + arg1 +' sa fie adaugat inapoi in Hub?</p>';
		document.getElementById('modal_footer').children[1].setAttribute('id', 'button_addMember');
	}
};

function addMemberDatabaseModal(memberName, memberMail, memberPlatit) {
	modalChange('addMember', memberName);
	page = document.getElementById('select_page').innerHTML;
	statusMembers = document.getElementById('member_status_l').innerHTML;
	console.log(page, 'page 255')
	console.log(statusMembers, 'statusmembers 259')
	document.getElementById('button_addMember').onclick = function () { addMemberDatabase(memberName, memberMail, 0, page , statusMembers) };
}

document.getElementById('form-add').addEventListener('submit', function (e) {
	e.preventDefault();
	let old_form = new FormData(e.target);
	if(old_form.get('username') & old_form.get('mail')) {
	page = document.getElementById('select_page').innerHTML;
	statusMembers = document.getElementById('member_status_l').innerHTML;
	console.log(page, 'page 255')
	console.log(statusMembers, 'statusmembers 259')
	if(old_form.get('platit') == undefined) {
		addMemberDatabase(old_form.get('username'), old_form.get('mail'),page, statusMembers, false);
	} else {
		addMemberDatabase(old_form.get('username'), old_form.get('mail'),page, statusMembers, old_form.get('platit'));
	}

	}
})

function addMemberDatabase(memberName, memberMail, memberPlatit, page, statusMembers) {
	fetch('panel/adaugare', {
		method: "POST",
		headers: {
			"Content-Type": "application/json"	
		},
		body: JSON.stringify({
			'member_name': memberName,
			'member_mail': memberMail,
			'member_platit': memberPlatit
		})
	}).then(function(res) {return res.json()})
	.then(function(result){
		fetchData(statusMembers, page);
		$('#modal_change').modal('hide');
	  }).catch(error => {
		console.log(error);
	  })
};


function fetchData(statusMembri, pageCurrent){
	console.log(statusMembri, pageCurrent)
	if (statusMembri == undefined) {statusMembri = 1};
	fetch('/panel/member_list_count/?status_membri=' + statusMembri, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},

	}).then(function(res) {return res.json()})
		.then(function(result){
			if (result.status == false){
				let div_alert = document.createElement('div');
				div_alert.classList.add('alert', 'text-center', 'alert-danger');
				div_alert.setAttribute('role', 'alert');
				div_alert.innerHTML = 'A aparut o eroare.';
				document.getElementById('alert_all').innerHTML = '';
				document.getElementById('alert_all').appendChild(div_alert);
			} else {
			let totalPages = Math.ceil(result.count / 10);
			if (pageCurrent == undefined) {
				pageCurrent = 1;
			};
			fetchDataA(pageCurrent, totalPages, statusMembri);
		}
	  	}).catch(error => {
			console.log(error);
	  	})
};

function fetchDataA(pageCurrent, totalPages, statusMembri) {
	if (statusMembri == undefined){
		statusMembri = 1;
	}
	if(pageCurrent > totalPages) {pageCurrent = totalPages};

	fetch('/panel/member_list/?page=' + pageCurrent + '&total=' + totalPages + '&status_membri=' + statusMembri, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		}).then(function(res) {return res.json()})
		  .then(function(result) {
			if (result.status == false){
				let div_alert = document.createElement('div');
				div_alert.classList.add('alert', 'text-center', 'alert-danger');
				div_alert.setAttribute('role', 'alert');
				div_alert.innerHTML = 'A aparut o eroare.';
				document.getElementById('alert_all').innerHTML = '';
				document.getElementById('alert_all').appendChild(div_alert);
			} else {
			let x = 0;
			document.getElementById('fetchData').innerHTML = '';
			if(statusMembri == 1){
				for(membru in result.membri){
					var id = result.membri[membru].id;
					var mail = result.membri[membru].mail;
					var platit = result.membri[membru].platit;
					var username = result.membri[membru].username;
					addMember(id, mail, platit, username);
					x += 1;
					};
				
					while (x < 10) {
						addMember('', '', '', '');
						x += 1;
					}
			} else {
				for(membru in result.membri){
					var id = result.membri[membru].id;
					var mail = result.membri[membru].mail;
					var platit = result.membri[membru].platit;
					var username = result.membri[membru].username;
					var status_membru = result.membri[membru].status_membru;
					addMemberStatus(id, mail, username, status_membru);
					x += 1;
					};
			
				while (x < 10) {
					addMemberStatus('', '', '', '', 1);
					x += 1;
				}
			};

			}
			}).then( reloadButtons(pageCurrent, totalPages, statusMembri))};

			  
			
function reloadButtons (pageCurrent, totalPages, statusMembri) {
	button_skip_start = document.getElementById('button_skip_start');
	button_backword = document.getElementById('button_backword');
	button_forword = document.getElementById('button_forword');
	button_skip_end = document.getElementById('button_skip_end');

	
	if (pageCurrent == 1) {
		button_skip_start.setAttribute('disabled', true);
		button_backword.setAttribute('disabled', true);
	} else {
		button_skip_start.removeAttribute('disabled');
		button_backword.removeAttribute('disabled');
		button_skip_start.onclick = function () {fetchDataA(1, totalPages, statusMembri);};
		button_backword.onclick = function () {fetchDataA(+pageCurrent - 1, totalPages, statusMembri);};
	};
	
	if (pageCurrent == totalPages) {
		button_forword.setAttribute('disabled', true);
		button_skip_end.setAttribute('disabled', true);
	} else { 
		button_forword.removeAttribute('disabled');
		button_skip_end.removeAttribute('disabled');
		button_forword.onclick = function () {fetchDataA(+pageCurrent + 1, totalPages, statusMembri);};
		button_skip_end.onclick = function () {fetchDataA(totalPages, totalPages, statusMembri);};
	};
	
	select_page = document.getElementById('select_page');
	select_page_content = document.getElementById('select_page_content');
	select_page.innerHTML = pageCurrent;
	select_page_content.innerHTML = '';

	let min_pages = 1;
	let max_pages = 1;
	if(pageCurrent - 3 < 1) {min_pages = 1} else {min_pages = +pageCurrent - 3};
	if(pageCurrent + 3 > totalPages) {max_pages = totalPages;} else {max_pages = +pageCurrent + 3;};
	for(i= min_pages ; i<= max_pages; i++) {
		option_select = document.createElement('button');
		option_select.classList.add('dropdown-item');
		option_select.setAttribute('type', 'button');
		if (i == pageCurrent) {
			option_select.classList.add('disabled');
		};
		option_select.innerHTML = i;
		option_select.onclick = function () {
			fetchDataA(this.innerHTML, totalPages, statusMembri);
		};
		select_page_content.appendChild(option_select);
	}
	option_select_count = document.createElement('div');
	option_select_count.setAttribute('style', 'display: none');
	option_select_count.setAttribute('id', 'member_status_l');
	option_select_count.innerHTML = statusMembri;
	select_page_content.appendChild(option_select_count);

	document.getElementById('show_all_members').onclick = function (e) {

		let tr_head = document.getElementById('tr_head');
		tr_id = tr_head.children[0];
		tr_name = tr_head.children[1];
		tr_mail = tr_head.children[2];
		tr_platit = tr_head.children[3];
		tr_send = tr_head.children[4];
		tr_remove = tr_head.children[5];


		if(e.target.innerHTML == 'Arata <br> toti userii') {
			e.target.innerHTML = 'Arata <br> doar membrii';
			tr_name.setAttribute('width', '40%');
			tr_mail.setAttribute('width', '50%');
			tr_platit.setAttribute('style', 'display: none');
			tr_send.setAttribute('style', 'display: none');
			tr_remove.setAttribute('width', '10%');
			tr_remove.innerHTML = 'Adauga/Scoate';
			fetchData(0, pageCurrent);
		} else {
			tr_name.setAttribute('width', '30%');
			tr_mail.setAttribute('width', '40%');
			tr_platit.removeAttribute('style');
			tr_send.removeAttribute('style');
			e.target.innerHTML = 'Arata <br> toti userii';
			tr_remove.setAttribute('width', '5%');
			tr_remove.innerHTML = 'Scoate';
			fetchData(1, pageCurrent);
		};
	};
};



window.onload = function() {
	fetchData();
  };


function updateStatus(e) {


	fetch('/panel/update', {
		method: "POST",
		headers: {
					 "Content-Type": "application/json"
				  },
		body: JSON.stringify({
			'member_id': upTo(e, 'tr').id,
			'platit': e.checked,
			'username': upTo(e, 'tr').children[1].innerHTML
		})
	  	})
	  	.then(function(res) {return res.json()})
	  	.then(function(result) {
			let div_alert = document.createElement('div');
			div_alert.classList.add('alert', 'text-center');
			div_alert.setAttribute('role', 'alert');
			if (result.status == false){
				div_alert.classList.add('alert-danger');
				div_alert.innerHTML = 'A aparut o eroare in actualizarea statusului. Membrul ' + result.data[2] + ' nu a fost actualizat.';
			} else {
				div_alert.classList.add('alert-primary');
				div_alert.innerHTML = 'Statusul de platit al membrului ' + result.data[2] + ' s-a actualizat in ' + result.status + '.';
			}
			document.getElementById('alert_all').innerHTML = '';
			document.getElementById('alert_all').appendChild(div_alert);
	  	}).catch(error => {
		  	console.log(error);
		});


}


function sendMailToMember(memberId, username, mail) {
	modalChange('sendMail', username);
	document.getElementById('button_sendMail').onclick = function () { sendMailModal(memberId, username, mail) };
}


function sendMailModal(memberId, username, mail) {
	fetch('/panel/sendmail', {
		method: "POST",
		headers: {
					 "Content-Type": "application/json"
				  },
		body: JSON.stringify({
			'member_id' : memberId,
			'username' : username,
			'mail_user' : mail
		})
	  	})
	  	.then(function(res) {return res.json()})
	  	.then(function(result) {
			let div_alert = document.createElement('div');
			div_alert.classList.add('alert', 'text-center');
			div_alert.setAttribute('role', 'alert');
			if (result.status == false){
				div_alert.classList.add('alert-danger');
				div_alert.innerHTML = 'A aparut o eroare in trimiterea unui email catre ' + mail + ', membrul ' + username +' cu id-ul ' + memberId + '.';
			} else {
				div_alert.classList.add('alert-primary');
				div_alert.innerHTML = 'Membrul ' + username + ' primit un mesaj pe adresa de email ' + mail + '.'
			}
			document.getElementById('alert_all').innerHTML = '';
			document.getElementById('alert_all').appendChild(div_alert);
	  	}).catch(error => {
		  	console.log(error);
		});
	$('#modal_change').modal('hide');
};


function removeMembru(memberId, username) {
	modalChange('remove', username);
	page = document.getElementById('select_page').innerHTML;
	statusMembrs = document.getElementById('member_status_l').innerHTML;
	document.getElementById('button_stergeMembru').onclick = function () { removeMembruModal(memberId, username, page, statusMembrs) };
}




function removeMembruModal(memberId, username, page, statusMembrs) {
	fetch('/panel/remove', {
		method: "POST",
		headers: {
					 "Content-Type": "application/json"
				  },
		body: JSON.stringify({
			'member_id': memberId,
		})
	  	})
	  	.then(function(res) {return res.json()})
	  	.then(function(result) {

			let div_alert = document.createElement('div');
			div_alert.classList.add('alert', 'text-center');
			div_alert.setAttribute('role', 'alert');
			if (result.status == false){
				div_alert.classList.add('alert-danger');
				div_alert.innerHTML = 'A aparut o eroare in stergerea membrului ' + username + '.';
			} else {
				div_alert.classList.add('alert-primary');
				div_alert.innerHTML = 'Membrul ' + username + ' a fost scos din hub.'
			
			}
			document.getElementById('alert_all').innerHTML = '';
			document.getElementById('alert_all').appendChild(div_alert);
	  	}).then( function () {
			fetchData(statusMembrs, page);
			$('#modal_change').modal('hide');
		}).catch(error => {
		  	console.log(error);
		});

};



function upTo(el, tagName) {
    while (el && el.parentNode) {
      	el = el.parentNode;
      	if (el.tagName && el.tagName.toLowerCase() == tagName) {
        	return el;
      }
    }
  
    // Many DOM methods return null if they don't 
    // find the element they are searching for
    // It would be OK to omit the following and just
    // return undefined
    return null;
  }

