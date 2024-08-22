const passwordLocalStorage = localStorage.getItem('passwordStorage');

const tableEl = document.querySelector('table > tbody')

export let dataPassword = (passwordLocalStorage && passwordLocalStorage != '') ? JSON.parse(passwordLocalStorage) : [];

export function localStorageAction(resultPassword,url) {
    let chekDataPassword = dataPassword.find(element => element.url === url);

    if (chekDataPassword) {
        chekDataPassword.passwords.push(resultPassword);
    } else {
        let objPassword = {
            url: url,
            passwords: [resultPassword]
        };
        dataPassword.push(objPassword);
    }

    parseLocalStorage(dataPassword)
    loadHistory()
}

function parseLocalStorage(data){
    localStorage.setItem('passwordStorage',JSON.stringify(data))
}

export function loadHistory() {
    tableEl.innerHTML = '';

    let tr = '';
    dataPassword.forEach((element,index) => {
        let p = '';
        element.passwords.forEach((e,i) => {
            // p += `<li id=listPassword>
            //     <input type="password" id="password${i}_${index} class="passwords" value="${e}" readonly>
            //     <div class="lihat_password">lihat</div>
            // </li>`;
            p += `<li id=listPassword>${e}</li>`;
        })
        tr += `
        <tr>
            <td>${index+1}</td>
            <td>${element.url}</td>
            <td>
                <ul>
                    ${p}
                </ul>
            </td>
        </tr>
        `;
    });
    tableEl.innerHTML = tr
}