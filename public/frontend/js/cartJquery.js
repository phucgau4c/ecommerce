$(document).ready(function () {
  const getObj = JSON.parse(localStorage.getItem('products'));
  let tableRow = '';
  const iconCart = $('a .fa-shopping-cart');
  const farent = $(iconCart).closest('ul.navbar-nav');
  const cartName = $(farent).find(':eq(10)');
  let cartTotal = 0;

  if (JSON.stringify(getObj) !== '{}' && getObj !== null) {
    for ([key, value] of Object.entries(getObj)) {
      cartTotal += value.qty;
    }

    $(cartName).text(`Cart (${cartTotal})`);
  }

  if (!getObj) return;

  function updateWebsite() {
    for ([key, value] of Object.entries(getObj)) {
      tableRow += `
  
        <tr id='${key}'>
          <td class="cart_product">
            <a href=""><img width="110px"  src="${value.img}" alt=""></a>
          </td>
          <td class="cart_description">
            <h4><a href="">${value.name}</a></h4>
            <p>Web ID: 1089772</p>
          </td>
          <td class="cart_price">
            <p>$${value.price}</p>
          </td>
          <td class="cart_quantity">
            <div class="cart_quantity_button">
              <a class="cart_quantity_up" href=""> + </a>
              <input class="cart_quantity_input" type="text" name="quantity" value="${
                value.qty
              }" autocomplete="off" size="2">
              <a class="cart_quantity_down" href=""> - </a>
            </div>
          </td>
          <td class="cart_total">
            <p class="cart_total_price">$${value.qty * value.price}</p>
          </td>
          <td class="cart_delete">
            <a class="cart_quantity_delete" href=""><i class="fa fa-times"></i></a>
          </td>
        </tr>
      
      `;
    }

    $('table tbody').append(tableRow);
  }

  updateWebsite();
  updateTotal();
  function updateCart() {
    let totalOfCart = 0;
    for ([key, value] of Object.entries(getObj)) {
      totalOfCart += value.qty;
    }
    $(cartName).text(`Cart (${totalOfCart})`);
  }

  function totalPrice(thiss) {
    const parent = $(thiss).closest('tr');
    const totalPrices = $(parent).find('.cart_total_price');
    const price = Number(
      $(parent).find('.cart_price p').text().replace('$', '')
    );
    const quantity = Number($(parent).find('.cart_quantity_input').val());

    totalPrices.text(`$${price * quantity}`);
  }

  function updateTotal() {
    let sum = 0;
    const total = $('.total_area ul li span').last();

    const arr = $('.cart_total_price').map(function () {
      return Number($(this).text().replace('$', ''));
    });

    for ([key, value] of Object.entries(arr)) {
      if (typeof value === 'number' && Number(key) < arr.length) sum += value;
    }

    $(total).text(`$${sum}`);
    console.log(sum);
  }

  function button(thiss, switchButton) {
    const parent = $(thiss).closest('tr');
    const cardInput = $(parent).find('.cart_quantity_input');
    const quantity = Number($(cardInput).val());

    if (switchButton === 'incre') {
      $(cardInput).val(quantity + 1);
      return quantity + 1;
    }

    if (switchButton === 'des') {
      if (quantity > 0) {
        $(cardInput).val(quantity - 1);
      }
      return quantity - 1;
    }
  }

  function compare(id, number) {
    for ([key, value] of Object.entries(getObj)) {
      if (key === id) {
        value.qty = number;
      }
    }
  }

  function udateStorage(getObj) {
    localStorage.setItem('products', JSON.stringify(getObj));
  }

  $('.cart_quantity_up').on('click', function () {
    const id = $(this).closest('tr').attr('id');
    if (!id) return;
    compare(id, button(this, 'incre'));
    udateStorage(getObj);
    totalPrice(this);
    updateTotal();
    updateCart();

    return false;
  });

  $('.cart_quantity_down').on('click', function () {
    const parent = $(this).closest('tr');
    const id = $(parent).attr('id');
    const quantity = button(this, 'des');
    if (!id) return;

    if (quantity < 1) {
      for ([key, value] of Object.entries(getObj)) {
        if (key === id) {
          delete getObj[key];
          $(`#${id}`).hide();
        }
      }
    }

    compare(id, quantity);
    totalPrice(this);
    updateTotal();
    udateStorage(getObj);
    updateCart();
    return false;
  });

  $('.cart_delete').on('click', function () {
    const id = $(this).closest('tr').attr('id');
    const parent = $(this).closest('tr');
    const totalPrices = $(parent).find('.cart_total_price');
    if (!id) return;

    for ([key, value] of Object.entries(getObj)) {
      if (key === id) {
        delete getObj[key];
        $(`#${id}`).hide();
      }
    }

    totalPrices.text('');
    udateStorage(getObj);
    updateCart();
    updateTotal();

    // alert('xoá thành công');
    return false;
  });
});
