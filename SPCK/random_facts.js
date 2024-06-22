window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-500px";
  }
}



document.addEventListener('DOMContentLoaded', function() {
    const factsBtn = document.getElementById('facts-btn');
    const factsList = document.getElementById('facts-list');

    factsBtn.addEventListener('click', function() {
        fetch('https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=100')
            .then(response => response.json())
            .then(data => {
                // Xóa các facts cũ
                factsList.innerHTML = '';

                // Thêm các facts mới nếu có hơn 7 từ
                data.forEach(fact => {
                    if (fact.text.split(' ').length > 10) {
                        const listItem = document.createElement('li');
                        listItem.textContent = fact.text;
                        factsList.appendChild(listItem);
                    }
                });
            })
            .catch(error => console.error('Error fetching cat facts:', error));
    });
});

