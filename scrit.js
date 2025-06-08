document.addEventListener('DOMContentLoaded', function () {
    let cars = [
      { id: 'AQ1', brand: "Audi", image: 'image/img2.jpg', price: 2000, qty: 3 },
      { id: 'AQ2', brand: "Polo", image: 'image/img1.jpg', price: 3000, qty: 2 },
      { id: 'AQ3', brand: "Bmw", image: 'image/img2.jpg', price: 5000, qty: 1 },
      { id: 'AQ4', brand: "Thar", image: 'image/img1.jpg', price: 6000, qty: 5 },
      { id: 'AQ5', brand: "Jaguar", image: 'image/img2.jpg', price: 7000, qty: 7 }
    ];

    function renderCars() {
      const searchItem = document.getElementById('SearchCar').value.toLowerCase();
      const filterCars = cars.filter(car => car.brand.toLowerCase().includes(searchItem));
      const root = document.getElementById('root');

      root.innerHTML = filterCars.map((item, index) => `
        <tr>
          <td>${item.id}</td>
          <td>${item.brand}</td>
          <td><img src="${item.image}" width="40" height="40"/></td>
          <td>&#8377;${item.price.toFixed(2)}</td>
          <td>
            <i class="fa-solid fa-minus" data-index="${index}" data-action="decrement"></i>
            ${item.qty}
            <i class="fa-solid fa-plus" data-index="${index}" data-action="increment"></i>
          </td>
          <td>&#8377;${(item.price * item.qty).toFixed(2)}</td>
          <td>
            <i class="fa-solid fa-trash text-danger" data-index="${index}" data-action="delete"></i>
            <i class="fa-solid fa-pen-to-square text-primary" data-index="${index}" data-action="edit"></i>
          </td>
        </tr>
      `).join('');

      grandTotal(filterCars);
    }

    function grandTotal(list) {
      const total = list.reduce((sum, car) => sum + (car.price * car.qty), 0);
      document.getElementById('totalAmt').innerHTML =  `&#8377;${total.toFixed(2)}`;
    }

    // Handle actions: increment, decrement, delete, edit
    document.getElementById('root').addEventListener('click', function (event) {
      const target = event.target;
      const index = target.dataset.index;
      const action = target.dataset.action;

      if (action === 'increment') {
        cars[index].qty++;
      } else if (action === 'decrement' && cars[index].qty > 0) {
        cars[index].qty--;
      } else if (action === 'delete') {
        cars.splice(index, 1);
      } else if (action === 'edit') {
        const car = cars[index];
        document.getElementById('carForm').style.display = 'block';
        document.getElementById('carId').value = car.id;
        document.getElementById('carBrand').value = car.brand;
        document.getElementById('carImage').value = car.image;
        document.getElementById('carPrice').value = car.price;
        document.getElementById('carQty').value = car.qty;
      }

      renderCars();
    });

    // Add new car button
    document.getElementById('addNewCarBtn').addEventListener('click', () => {
      document.getElementById('carForm').style.display = 'block';
      document.getElementById('carId').value = '';
      document.getElementById('carBrand').value = '';
      document.getElementById('carImage').value = '';
      document.getElementById('carPrice').value = '';
      document.getElementById('carQty').value = '';
    });

    // Save (Add or Edit)
    document.getElementById('saveCarBtn').addEventListener('click', () => {
      const id = document.getElementById('carId').value;
      const brand = document.getElementById('carBrand').value;
      const image = document.getElementById('carImage').value;
      const price = parseFloat(document.getElementById('carPrice').value);
      const qty = parseInt(document.getElementById('carQty').value);

      if (!brand || !image || isNaN(price) || isNaN(qty)) {
        alert("Please fill all fields correctly!");
        return;
      }

      if (id) {
        const index = cars.findIndex(car => car.id === id);
        if (index !== -1) {
          cars[index].brand = brand;
          cars[index].image = image;
          cars[index].price = price;
          cars[index].qty = qty;
        }
      } else {
        const newId = 'AQ' + (cars.length + 1);
        cars.push({ id: newId, brand, image, price, qty });
      }

      document.getElementById('carForm').style.display = 'none';
      renderCars();
    });

    // Search input
    document.getElementById('SearchCar').addEventListener('input', renderCars);

    renderCars();
  });