// modal

const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    overlay = document.querySelector('.overlay'),
    menu = document.querySelector(".menu"),
    hamburger = document.querySelector('.hamburger')


function openModal () {
    overlay.style.display = 'block';
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal () {
    overlay.style.display = 'none';
    modal.style.display = 'none';
    document.body.style.overflow = ''; 
}

modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => {
        openModal()
        })});

modal.addEventListener('click', (e) => {
    if(e.target === modal || e.target.getAttribute('data-close')) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === "Escape") { 
        closeModal();
    }
});

document.getElementById('modal-link').addEventListener('click', openModal);

function toggleMenu() {
    if (menu.classList.contains("menu_active")) {
      menu.classList.remove("menu_active"),
      hamburger.classList.remove("hamburger_active");
    } else {
      menu.classList.add("menu_active"),
      hamburger.classList.add("hamburger_active")
    }
  }

hamburger.addEventListener('click', toggleMenu)


// form
    const form = document.querySelectorAll('.modal-form'),
        inputs = document.querySelectorAll('input');
    
    
    const message = {
        loading: 'Loading...',
        success: 'Thank you! You will be contacted soon!',
        failture: 'Something went wrong'
    }

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;

        const res = await fetch(url, {
            method: 'POST',
            body: data
        });
        
        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    
    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);

            postData('js/server.php', formData)
                .then(()=> {
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failture)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        closeModal();
                    }, 1000);
                })
        })
    })

    // menu


