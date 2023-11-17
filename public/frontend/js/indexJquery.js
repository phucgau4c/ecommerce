$(document).ready(function () {
  const getObj = JSON.parse(localStorage.getItem('products'));
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

  $('.overlay-content .add-to-cart').on('click', function () {
    const getObj = JSON.parse(localStorage.getItem('products'));

    const singleProduct = $(this).closest('.single-products');
    const productInfor = $(singleProduct).find('.productinfo');
    let obj = {};
    let totalOfCart = 0;

    const img = $(productInfor).find('img');
    const h2 = $(productInfor).find('h2');
    const p = $(productInfor).find('p');

    const idProduct = $(productInfor).attr('id');
    const imgProduct = $(img).attr('src');
    const priceProduct = Number($(h2).text().replace('$', ''));
    const nameProduct = $(p).text();

    obj[idProduct] = {
      img: imgProduct,
      price: priceProduct,
      name: nameProduct,
      qty: 1,
    };

    if (getObj === null) {
      localStorage.setItem('products', JSON.stringify(obj));
      totalOfCart += obj[idProduct].qty;
      alert('thêm vào giỏ hàng thành công!');
      $(cartName).text(`Cart (${totalOfCart})`);
    } else {
      for ([key, value] of Object.entries(obj)) {
        for ([keyLocal, valueLocal] of Object.entries(getObj)) {
          if (keyLocal === key) {
            valueLocal.qty += value.qty;
          }
        }
      }

      let mergeObj = { ...obj, ...getObj };
      for ([key, value] of Object.entries(mergeObj)) {
        totalOfCart += value.qty;
      }
      $(cartName).text(`Cart (${totalOfCart})`);

      localStorage.setItem('products', JSON.stringify(mergeObj));
      alert('thêm vào giỏ hàng thành công!');
    }

    return false;
  });
});
