document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("addButton");
  const formContainer = document.getElementById("formContainer");
  const subscriptionForm = document.getElementById("subscriptionForm");
  const cancelButton = document.getElementById("cancelButton");
  const subscriptionTable = document.getElementById("subscriptionTable").querySelector("tbody");


  const table = document.querySelector("table");
  const data = [
    {
      name: "grei",
      mbiemri: "hasani",
      mosha: 23,
      startDate: "2017-06-01",
      endDate: "2024-06-01",
      subscriptionType: "rent",
      active: true,
      payment: 200,
      paymentMethod: "VISA",
    },
    {
      name: "Arben",
      mbiemri: "hasani",
      mosha: 54,
      startDate: "2018-08-06",
      endDate: "2024-08-09",
      subscriptionType: "rent",
      active: false,
      payment: 400,
      paymentMethod: "Paypal",
    },
    {
      name: "Frencis",
      mbiemri: "Jaupaj",
      mosha: 24,
      startDate: "2017-08-12",
      endDate: "2024-09-01",
      subscriptionType: "rent",
      active: true,
      payment: 800,
      paymentMethod: "MasterCard",
    },

    
  ];

  function fillTable() {
    subscriptionTable.innerHTML = "";
    data.forEach((subscription, index) => {
      const row = subscriptionTable.insertRow();
      populateRow(row, subscription, index);
    });
    table.appendChild(subscriptionTable);
  }

  fillTable();

  let editIndex = null;

  addButton.addEventListener("click", () => {
    formContainer.classList.remove("hidden");
    subscriptionForm.reset();
    editIndex = null;
  });

  cancelButton.addEventListener("click", () => {
    formContainer.classList.add("hidden");
  });

  subscriptionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(subscriptionForm);
    const subscription = {
      name: formData.get("name"),
      mbiemri: formData.get("surname"),
      mosha: parseInt(formData.get("moshe")),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      subscriptionType: formData.get("subscriptionType"),
      active: formData.get("active") === "on",
      payment: parseFloat(formData.get("payment")),
      paymentMethod: formData.get("paymentMethod"),
    };

    if (editIndex === null) {
      addRow(subscription);
    } else {
      updateRow(editIndex, subscription);
    }

    formContainer.classList.add("hidden");
  });

  function addRow(subscription) {
    data.push(subscription);
    fillTable();
  }

  function updateRow(index, subscription) {
    data[index] = subscription;
    fillTable();
  }

  function populateRow(row, subscription, index) {
    row.innerHTML = `
      <td>${subscription.name}</td>
      <td>${subscription.mbiemri}</td>
      <td>${subscription.mosha}</td>
      <td>${subscription.startDate}</td>
      <td>${subscription.endDate}</td>
      <td>${subscription.subscriptionType}</td>
      <td>${subscription.active ? "Yes" : "No"}</td>
      <td>${subscription.payment}</td>
      <td>${subscription.paymentMethod}</td>
    `;

    const actionsCell = row.insertCell();
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      editIndex = index;
      loadForm(subscription);
      formContainer.classList.remove("hidden");
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      data.splice(index, 1);
      fillTable();
    });

    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
  }

  function loadForm(subscription) {
    subscriptionForm.elements["name"].value = subscription.name;
    subscriptionForm.elements["surname"].value = subscription.mbiemri;
    subscriptionForm.elements["moshe"].value = subscription.mosha;
    subscriptionForm.elements["startDate"].value = subscription.startDate;
    subscriptionForm.elements["endDate"].value = subscription.endDate;
    subscriptionForm.elements["subscriptionType"].value = subscription.subscriptionType;
    subscriptionForm.elements["active"].checked = subscription.active;
    subscriptionForm.elements["payment"].value = subscription.payment;
    subscriptionForm.elements["paymentMethod"].value = subscription.paymentMethod;
  }
});
