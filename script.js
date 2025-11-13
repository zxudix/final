$(document).ready(function() {

  // --- Кнопка Shop Now ---
  $("#shopNow").click(function() {
    window.location.href = "products.html";
  });

  // --- Проверка силы пароля ---
  function getPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    if (strength <= 1) return 'Weak';
    if (strength <= 3) return 'Medium';
    return 'Strong';
  }

  function updatePasswordStrength(password) {
    let strength = getPasswordStrength(password);
    let color = (strength === 'Medium') ? 'orange' :
                (strength === 'Strong') ? 'green' : 'red';
    $('#passwordStrength').text(strength).css('color', color);
  }

  $("#password").on("input", function() {
    updatePasswordStrength($(this).val());
  });

  // --- Форма обратной связи ---
  $("#contactForm").on("submit", function(e) {
    e.preventDefault();

    let name = $("#name").val().trim();
    let email = $("#email").val().trim();
    let msg = $("#message").val().trim();
    let password = $("#password").val();
    let confirmPassword = $("#confirmPassword").val();
    let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !msg) {
      alert("Please fill all fields!");
      return;
    }

    if (!emailReg.test(email)) {
      alert("Invalid email format!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert("Message sent successfully!");
    $(this).trigger("reset");
  });

  // --- Поиск по продуктам ---
  $("#productSearch").on("keyup", function() {
    let query = $(this).val().toLowerCase();
    $(".product-item").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(query) > -1);
    });
  });

  // --- Добавление в корзину ---
  $(".add-cart").click(function() {
    let name = $(this).data("name");
    let price = $(this).data("price");

    let exists = false;
    $("#cartTable tbody tr").each(function() {
      if ($(this).find("td:first").text() === name) exists = true;
    });
    if (exists) {
      alert("Item already in cart!");
      return;
    }

    let row = `<tr>
      <td>${name}</td>
      <td>$${price}</td>
      <td>
        <button class="btn btn-sm btn-primary edit-row">Edit</button>
        <button class="btn btn-sm btn-danger delete-row">Delete</button>
      </td>
    </tr>`;
    $("#cartTable tbody").append(row).hide().slideDown();
  });

  // --- Удаление из корзины ---
  $(document).on("click", ".delete-row", function() {
    if (confirm("Delete this item?")) {
      $(this).closest("tr").fadeOut(300, function() {
        $(this).remove();
      });
    }
  });

  // --- Редактирование товара ---
  $(document).on("click", ".edit-row", function() {
    let row = $(this).closest("tr");
    let name = row.find("td:eq(0)").text();
    let price = row.find("td:eq(1)").text().replace("$", "");

    let newName = prompt("Edit product name:", name);
    if (newName) row.find("td:eq(0)").text(newName);

    let newPrice = prompt("Edit product price:", price);
    if (newPrice && !isNaN(newPrice)) row.find("td:eq(1)").text("$" + newPrice);
  });

  // --- Галерея ---
  const galleryItems = [
    {src:"img1.jpg", category:"nature"},
    {src:"img2.jpg", category:"architecture"},
    {src:"img3.jpg", category:"portrait"},
    {src:"img4.jpg", category:"nature"},
    {src:"img5.jpg", category:"architecture"}
  ];

  const $grid = $(".gallery-grid");
  galleryItems.forEach(item => {
    $grid.append(`
      <div class="gallery-item" data-category="${item.category}">
        <img src="${item.src}" loading="lazy" class="gallery-img">
      </div>
    `);
  });

  $(".filter-btn").click(function() {
    let cat = $(this).data("category");
    $(".gallery-item").fadeOut(200);
    if (cat === "all") $(".gallery-item").fadeIn(400);
    else $(`.gallery-item[data-category="${cat}"]`).fadeIn(400);
  });

  $(".gallery-img").click(function() {
    let src = $(this).attr("src");
    $("#lightboxImg").attr("src", src);
    $("#lightboxModal").modal("show");
  });

  // --- Анимация карточек продуктов ---
  $(".product-card").hover(
    function() {
      $(this).css({
        transform: "scale(1.05)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.4)"
      });
    },
    function() {
      $(this).css({
        transform: "scale(1)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
      });
    }
  );

});
