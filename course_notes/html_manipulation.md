# HTML Manipulation

## The Search Form

* HTML

      <form>
        <input placeholder="Location"> 
        <button>Search</button>
      </form>

* Event listener

      const weatherForm = document.querySelector('form');
      const search = document.querySelector('input');

      weatherForm.addEventListener('submit', (e) => { 
        e.preventDefault();

        const location = search.value;

        fetch('http://localhost:3000/weather?address=' + location).then((response) => {
          response.json().then((data) => { 
            if (data.error) {
              console.log(data.error);
            } else {
              console.log(data.location);
            console.log(data.forecast);
           }
          });
        });
       });

## Rendering textContent

    // HTML
    <p id="message-1"></p>

    // # -> select by id
    const messageOne = document.querySelector('#message-1'); 
    messageOne.textContent = 'My new text';
