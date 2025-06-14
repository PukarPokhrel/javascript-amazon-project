const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();

// xhr.open('GET', 'https://supersimplebackend.dev/hello');
// xhr.send();

// xhr.open('GET', 'https://supersimplebackend.dev/products/first');
// xhr.send();

// xhr.open('GET', 'https://supersimplebackend.dev/documentation');
// xhr.send();

// xhr.open('GET', 'https://supersimplebackend.dev/images/apple.jpg');
// xhr.send();

// xhr.open('GET', 'https://supersimplebackend.dev/not-supported'); // This will fail with a 404 error
// xhr.send();
