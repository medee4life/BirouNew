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
				td_two.onclick = function() {
					showHistoryUniv(memberId, 'fetchHistoryUser')
				}; 
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
					updateStatus(this, memberId, username, platit)
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
					tr.setAttribute('style', 'height: 48px !important')

					document.querySelector('#fetchData').appendChild(tr);
				}

}

function addHistory(memberId, date, time, username, action, yes) {
	console.log(memberId, date, time, username, action)
	if (yes) {
	let tr = document.createElement('tr');
	tr.setAttribute('style', 'height: 48px !important');

	let td_one = document.createElement('td');
	td_one.setAttribute('scope', 'row');
	td_one.innerHTML = memberId;
	td_one.classList.add('text-truncate', 'text-nowrap');
	tr.appendChild(td_one);


	let td_two = document.createElement('td');
	td_two.setAttribute('scope', 'row');
	td_two.innerHTML = date;
	td_two.classList.add('text-truncate', 'text-nowrap');
	tr.appendChild(td_two);
	

	let td_three = document.createElement('td');
	td_three.setAttribute('scope', 'row');
	td_three.innerHTML = time;
	td_three.classList.add('text-truncate', 'text-nowrap');
	tr.appendChild(td_three)

	let td_four = document.createElement('td');
	td_four.innerHTML = username;
	td_four.classList.add('text-truncate', 'text-nowrap');
	tr.appendChild(td_four);


	let td_five = document.createElement('td');
	td_five.innerHTML = action;
	td_five.classList.add('text-truncate', 'text-nowrap');
	tr.appendChild(td_five);
	
	
	document.querySelector('#fetchData').appendChild(tr);
	} else {
		let tr = document.createElement('tr');
		tr.setAttribute('style', 'height: 48px !important')
		
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
		tr.setAttribute('style', 'height: 48px !important')

		document.querySelector('#fetchData').appendChild(tr);
	}

}

function modalChange (NameModal, arg1) {
	if (NameModal == 'sendMail'){
		document.getElementById('modal_title').innerHTML = 'Trimite E-mail';
		document.getElementById('modal_body').innerHTML = '<p>Esti sigur ca doresti sa trimiti un e-mail de reamintire lui <br>' + arg1 +'?</p>';
		document.getElementById('modal_footer').children[1].setAttribute('id', 'button_sendMail');
		document.getElementById('button_sendMail').classList.remove('bg-danger');
		document.getElementById('button_sendMail').classList.remove('bg-success');
		document.getElementById('button_sendMail').classList.add('bg-success');
	}
	if (NameModal == 'remove') {
		console.log('remove')
		document.getElementById('modal_title').innerHTML = 'Sterge membru';
		document.getElementById('modal_body').innerHTML = '<p>Esti sigur ca doresti ca ' + arg1 +' sa fie clandestin?</p>';
		document.getElementById('modal_footer').children[1].setAttribute('id', 'button_stergeMembru');
		document.getElementById('button_stergeMembru').classList.remove('bg-danger');
		document.getElementById('button_stergeMembru').classList.remove('bg-success');
		document.getElementById('button_stergeMembru').classList.add('bg-danger');
	}
	if (NameModal == 'addMember') {
		console.log('addMember')
		document.getElementById('modal_title').innerHTML = 'Adauga membrul inapoi';
		document.getElementById('modal_body').innerHTML = '<p>Esti sigur ca doresti ca ' + arg1 +' sa fie adaugat inapoi in Hub?</p>';
		document.getElementById('modal_footer').children[1].setAttribute('id', 'button_addMember');
		document.getElementById('button_addMember').classList.remove('bg-danger');
		document.getElementById('button_addMember').classList.remove('bg-success');
		document.getElementById('button_addMember').classList.add('bg-success');
	}
	if (NameModal == 'sendall') {
		console.log('sendall')
		document.getElementById('modal_title').innerHTML = 'Trimite un e-mail tuturor.';
		document.getElementById('modal_body').innerHTML = '<p>Esti sigur ca doresti sa trimiti un e-mail de reamintire tuturor celor ce nu au platit?</p>';
		document.getElementById('modal_footer').children[1].setAttribute('id', 'button_sendall');
		document.getElementById('button_sendall').classList.remove('bg-danger');
		document.getElementById('button_sendall').classList.remove('bg-success');
		document.getElementById('button_sendall').classList.add('bg-success');
	}
};

function addMemberDatabaseModal(memberName, memberMail, memberPlatit) {
	modalChange('addMember', memberName);
	page = document.getElementById('select_page').innerHTML;
	statusMembers = document.getElementById('member_status_l').innerHTML;
	document.getElementById('button_addMember').onclick = function () { addMemberDatabase(memberName, memberMail, 0, page , statusMembers) };
}

document.getElementById('form-add').addEventListener('submit', function (e) {
	e.preventDefault();
	let old_form = new FormData(e.target);
	console.log(old_form.get('mail'))
	if(old_form.get('username') && old_form.get('mail')) {
	page = document.getElementById('select_page').innerHTML;
	statusMembers = document.getElementById('member_status_l').innerHTML;
	console.log(page, 'page 255');
	console.log(statusMembers, 'statusmembers 259');
	console.log(old_form.get('platit'));
	if(old_form.get('platit') == undefined) {
		console.log(page, statusMembers, 'nfujerguedhig')
		addMemberDatabase(old_form.get('username'), old_form.get('mail'), false, page, statusMembers);
	} else {
		addMemberDatabase(old_form.get('username'), old_form.get('mail'), old_form.get('platit'),page, statusMembers);
	}

	}
})

function addMemberDatabase(memberName, memberMail, memberPlatit, page, statusMembers) {
	console.log(memberName, memberMail, memberPlatit, page, statusMembers, 'asd')
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
		$('#AdaugaMembru').modal('hide');
		$('#modal_change').modal('hide');
	}).catch(error => {
		console.log(error);
	})
};

function addInHistory(memberId, sentance){
	console.log(memberId, sentance, 'this go')
	fetch('/panel/history_add', {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			'member_id': memberId,
			'sentance': sentance,
		})

	}).then(function(res) {return res.json()})
		.then(function(result){
			console.log(result)
	  	}).catch(error => {
			console.log(error);
	  	})
};


function fetchHistory(pageCurrent, typeHistory, typeFetch){
	fetch('/panel/history_page_count/?type_history=' + typeHistory, {
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
			console.log(totalPages, result.count, 'xxx')
			if (pageCurrent == undefined) {
				pageCurrent = 1;
			};
			fetchHistoryA(pageCurrent, totalPages, typeHistory, typeFetch);
		}
	  	}).catch(error => {
			console.log(error);
	  	})
};

function fetchHistoryA(pageCurrent, totalPages, typeHistory, typeFetch) {
	if(pageCurrent > totalPages) {pageCurrent = totalPages};
	if(pageCurrent == 0 && totalPages > 0) {pageCurrent = 1};
	fetch('/panel/history_page/?page=' + pageCurrent + '&total=' + totalPages + '&type_history=' + typeHistory, {
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
			console.log(result)
			for(action in result.history){
				var memberId = result.history[action].id;
				var date = result.history[action].date;
				var time = result.history[action].time;
				var username = result.history[action].username;
				var action = result.history[action].action;
				addHistory(memberId ,date, time, username, action, 1);
				x += 1;
				};
		
			while (x < 10) {
				addHistory('', '', '');
				x += 1;
			}
		

			}
			}).then( reloadButtons(pageCurrent, totalPages, 0, typeHistory, typeFetch))};



function fetchData(statusMembri, pageCurrent){
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
			console.log(totalPages, result.count, 'xxx')
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
	if(pageCurrent == 0 && totalPages > 0) {pageCurrent = 1};
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
					addMember(id, mail, platit, username, 1);
					x += 1;
					};
				
					while (x < 10) {
						addMember('', '', '');
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
			}).then( reloadButtons(pageCurrent, totalPages, statusMembri, undefined, 'fetchData'))};

			  
			
function reloadButtons (pageCurrent, totalPages, statusMembri, typeHistory, typeFetch) {
	button_skip_start = document.getElementById('button_skip_start');
	button_backword = document.getElementById('button_backword');
	button_forword = document.getElementById('button_forword');
	button_skip_end = document.getElementById('button_skip_end');

	select_page = document.getElementById('select_page');
	show_history = document.getElementById('show_history');
	show_users = document.getElementById('show_all_members');
	send_mail_all = document.getElementById('button_send_all');

	console.log(pageCurrent, 'aaaaaaaaaaaa')
	if(pageCurrent == 0) {
		button_skip_start.setAttribute('disabled', true);
		button_backword.setAttribute('disabled', true);
		button_skip_end.setAttribute('disabled', true);
		button_forword.setAttribute('disabled', true);
		select_page.setAttribute('disabled', true);
	} else if (pageCurrent == 1) {
		button_skip_start.setAttribute('disabled', true);
		button_backword.setAttribute('disabled', true);
	} else {
		select_page.removeAttribute('disabled');
		button_skip_start.removeAttribute('disabled');
		button_backword.removeAttribute('disabled');
		button_skip_start.onclick = function () {
			if(typeFetch == 'fetchData') {fetchDataA(1, totalPages, statusMembri);}
			else if (typeFetch == 'fetchHistory') {fetchHistoryA(1, totalPages, 0, 'fetchHistory');}
			else if (typeFetch == 'fetchHistoryUser') {fetchHistoryA(1, totalPages, typeHistory, typeFetch )}};
		button_backword.onclick = function () {
			if(typeFetch == 'fetchData') {fetchDataA(+pageCurrent - 1, totalPages, statusMembri);}
			else if (typeFetch == 'fetchHistory') {fetchHistoryA(+pageCurrent - 1, totalPages, 0, 'fetchHistory');}
			else if (typeFetch == 'fetchHistoryUser') {fetchHistoryA(+pageCurrent - 1, totalPages, typeHistory, typeFetch )}};};
	
	if (pageCurrent == totalPages) {
		button_forword.setAttribute('disabled', true);
		button_skip_end.setAttribute('disabled', true);
	} else {
		select_page.removeAttribute('disabled');
		button_forword.removeAttribute('disabled');
		button_skip_end.removeAttribute('disabled');
		button_forword.onclick = function () {
			console.log(pageCurrent, totalPages, statusMembri ,typeHistory, typeFetch, typeFetch == 'fetchHistory');
			if(typeFetch == 'fetchData') {fetchDataA(+pageCurrent + 1, totalPages, statusMembri);}
			if (typeFetch == 'fetchHistory') {fetchHistoryA(+pageCurrent + 1, totalPages, 0, 'fetchHistory');}
			else if (typeFetch == 'fetchHistoryUser') {fetchHistoryA(+pageCurrent + 1, totalPages, typeHistory, typeFetch )}};
		button_skip_end.onclick = function () {
			if(typeFetch == 'fetchData') {fetchDataA(totalPages, totalPages, statusMembri);}
			else if (typeFetch == 'fetchHistory') {fetchHistoryA(totalPages, totalPages, 0, 'fetchHistory');}
			else if (typeFetch == 'fetchHistoryUser') {fetchHistoryA(totalPages, totalPages, typeHistory, typeFetch )}};
	};
	
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
		option_select.onclick = function () {console.log(this.innerHTML, 'inner', typeFetch, typeHistory);
			if(typeFetch == 'fetchData') {fetchDataA(this.innerHTML, totalPages, statusMembri);}
			else if (typeFetch == 'fetchHistory') {fetchHistoryA(this.innerHTML, totalPages, 0, 'fetchHistory');}
			else if (typeFetch == 'fetchHistoryUser') {fetchHistoryA(this.innerHTML, totalPages, typeHistory, typeFetch )}};

		select_page_content.appendChild(option_select);
	}
	if (typeFetch == 'fetchData') {option_select_count = document.createElement('div');
	option_select_count.setAttribute('style', 'display: none');
	option_select_count.setAttribute('id', 'member_status_l');
	option_select_count.innerHTML = statusMembri;
	select_page_content.appendChild(option_select_count);}

	show_users.onclick = function () {

		let textTabel = document.getElementById('text_tabel');

		let tr_head = document.getElementById('tr_head');
		tr_id = tr_head.children[0];
		tr_name = tr_head.children[1];
		tr_mail = tr_head.children[2];
		tr_platit = tr_head.children[3];
		tr_send = tr_head.children[4];
		tr_remove = tr_head.children[5];

		tr_name.setAttribute('width', '40%');
		tr_mail.setAttribute('width', '50%');
		tr_platit.setAttribute('style', 'display: none');
		tr_send.setAttribute('style', 'display: none');
		tr_remove.setAttribute('width', '10%');
		tr_remove.innerHTML = 'Adauga/Scoate';

		textTabel.innerHTML = 'Tabel Toti Membri'
		buttons_chose.children[0].setAttribute('style', 'display: none');
		buttons_chose.children[1].setAttribute('style', 'display: none');
		buttons_chose.children[2].setAttribute('style', 'display: none');
		buttons_chose.children[3].removeAttribute('style');
		fetchData(0, pageCurrent);
		
	};

	document.getElementById('buttons_chose').children[3].onclick = function () {
		let tr_head = document.getElementById('tr_head');
		tr_id = tr_head.children[0];
		tr_name = tr_head.children[1];
		tr_mail = tr_head.children[2];
		tr_platit = tr_head.children[3];
		tr_send = tr_head.children[4];
		tr_remove = tr_head.children[5];

		let buttons_chose = document.getElementById('buttons_chose');
		let textTabel = document.getElementById('text_tabel');

		tr_id.innerHTML = 'Id';
		tr_id.setAttribute('width', '5%')
		tr_name.innerHTML = 'Name';
		tr_name.setAttribute('width', '30%');
		tr_mail.innerHTML = 'E-mail';
		tr_mail.setAttribute('width', '40%');
		tr_platit.innerHTML = 'Platit';
		tr_platit.setAttribute('width', '5%');
		tr_send.innerHTML = 'Trimite E-mail';
		tr_send.setAttribute('width', '10%');
		tr_remove.innerHTML = 'Scoate';
		tr_remove.removeAttribute('style');

		textTabel.innerHTML = 'Tabel Membri';

		buttons_chose.children[0].removeAttribute('style');
		buttons_chose.children[1].removeAttribute('style');
		buttons_chose.children[2].removeAttribute('style');
		buttons_chose.children[3].setAttribute('style', 'display: none');
		fetchData(1, pageCurrent);
	};

	show_history.onclick = function () {showHistoryUniv(0, 'fetchHistory')};

	send_mail_all.onclick = function () {sendToAll()};
};

function sendToAll() {
	modalChange('sendall');
	page = document.getElementById('select_page').innerHTML;
	document.getElementById('button_sendall').onclick = function () { sendToAllModal(page) };
};

function sendToAllModal(page) {
	fetch('/panel/sendall', {
		method: "GET",
		headers: {
					 "Content-Type": "application/json"
				  },
	  	})
	  	.then(function(res) {return res.json()})
	  	.then(function(result) {

			let div_alert = document.createElement('div');
			div_alert.classList.add('alert', 'text-center');
			div_alert.setAttribute('role', 'alert');
			if (result.status == false){
				div_alert.classList.add('alert-danger');
				div_alert.innerHTML = 'A aparut o eroare la trimiterea mailurilor.';
			} else {
				div_alert.classList.add('alert-primary');
				div_alert.innerHTML = 'S-a trimis mail tuturor membrilor.'
			
			}
			document.getElementById('alert_all').innerHTML = '';
			document.getElementById('alert_all').appendChild(div_alert);
	  	}).then(addInHistory(0, 'A trimis mail tuturor '))
		.catch(error => {
		  	console.log(error);
		});
		$('#modal_change').modal('hide');
};


function showHistoryUniv(typeHistory, typeFetch){
	let tr_head = document.getElementById('tr_head');
	tr_id = tr_head.children[0];
	tr_name = tr_head.children[1];
	tr_mail = tr_head.children[2];
	tr_platit = tr_head.children[3];
	tr_send = tr_head.children[4];
	tr_remove = tr_head.children[5];

	let buttons_chose = document.getElementById('buttons_chose');
	let textTabel = document.getElementById('text_tabel');

	tr_name.innerHTML = 'Data';
	tr_name.setAttribute('width', '5%');
	tr_mail.innerHTML = 'Timpul';
	tr_mail.setAttribute('width', '5%');
	tr_platit.innerHTML = 'User';
	tr_platit.setAttribute('width', '10%');

	tr_send.innerHTML = 'Actiune';
	tr_send.setAttribute('width', '75%');

	tr_remove.setAttribute('style', 'display: none');
	
	if (typeHistory == 0) {
		textTabel.innerHTML = 'Istoric';
	} else {
		textTabel.innerHTML = 'Istoricul membrului cu id-ul ' + typeHistory;
	}

	buttons_chose.children[0].setAttribute('style', 'display: none');
	buttons_chose.children[1].setAttribute('style', 'display: none');
	buttons_chose.children[2].setAttribute('style', 'display: none');
	buttons_chose.children[3].removeAttribute('style');
	fetchHistory(undefined, typeHistory, typeFetch);
	
};



window.onload = function() {
	fetchData();
  };


function updateStatus(e, memberId, membru, statusMembru) {

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
				div_alert.innerHTML = 'A aparut o eroare in actualizarea statusului. Membrul ' + membru + ' nu a fost actualizat.';
			} else {
				div_alert.classList.add('alert-primary');
				div_alert.innerHTML = 'Statusul de platit al membrului ' + membru + ' s-a actualizat in ' + statusMembru + '.';
			}
			document.getElementById('alert_all').innerHTML = '';
			document.getElementById('alert_all').appendChild(div_alert);
	  	}).then(addInHistory(memberId, 'A schimbat statusul de platit al membrului ' + membru + ' in ' + statusMembru))
		.catch(error => {
		  	console.log(error);
		});

		console.log(membru, statusMembru);
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
	  	}).then(addInHistory(memberId, 'A trimis un mail catre ' + username))
		.catch(error => {
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
		}).then(addInHistory(memberId, 'A scos membrul ' + username))
		.catch(error => {
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

