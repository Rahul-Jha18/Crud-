
let regForm = document.querySelector(".register-form");
let allInput = regForm.querySelectorAll("input");
let closeBtn = document.querySelector(".btn-close");
let tableBody = document.querySelector("tbody");
let currentEditingIndex = null;

let allRegData = JSON.parse(localStorage.getItem("allRegData")) || [];

function updateTable() {
    tableBody.innerHTML = "";
    allRegData.forEach((user, index) => {
        let row = `<tr>
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.contact}</td>
            <td>${user.dob}</td>
            <td>
                <button class="btn p-1 px-2 btn-primary" onclick="editUser(${index})">
                    <i class="fa fa-edit"></i> Edit
                </button>
                <button class="btn p-1 px-2 btn-danger" onclick="deleteUser(${index})">
                    <i class="fa fa-trash"></i> Delete
                </button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function editUser(index) {
    currentEditingIndex = index;
    let user = allRegData[index];
    allInput[0].value = user.name;
    allInput[1].value = user.email;
    allInput[2].value = user.contact;
    allInput[3].value = user.dob;
    allInput[4].value = user.password;
    
    let submitButton = regForm.querySelector("button[type='submit']");
    submitButton.innerHTML = "Update";
}

function deleteUser(index) {
    Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
    }).then((result) => {
        if (result.isConfirmed) {
            allRegData.splice(index, 1);
            localStorage.setItem("allRegData", JSON.stringify(allRegData));
            updateTable();
            Swal.fire("Deleted!", "User has been removed.", "success");
        }
    });
}

regForm.onsubmit = (e) => {
    e.preventDefault();

    if (currentEditingIndex === null) {
        let checkEmail = allRegData.find((data) => data.email === allInput[1].value);
        if (checkEmail) {
            Swal.fire({
                title: "Email Already Exists!",
                text: "Please use a different email.",
                icon: "warning",
                confirmButtonText: "OK",
                confirmButtonColor: "#d33",
            });
            return;
        }
    }

    let newUser = {
        name: allInput[0].value,
        email: allInput[1].value,
        contact: allInput[2].value,
        dob: allInput[3].value,
        password: allInput[4].value,
    };

    if (currentEditingIndex === null) {
        allRegData.push(newUser);
        Swal.fire({
            title: "Success!",
            text: "User registered successfully!",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6",
        });
    } else {
        allRegData[currentEditingIndex] = newUser;
        Swal.fire({
            title: "Updated!",
            text: "User data updated successfully!",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6",
        });
    }

    localStorage.setItem("allRegData", JSON.stringify(allRegData));

    closeBtn.click();

    regForm.reset();

    let submitButton = regForm.querySelector("button[type='submit']");
    submitButton.innerHTML = "Register";

    currentEditingIndex = null;

    updateTable();
};

updateTable();


