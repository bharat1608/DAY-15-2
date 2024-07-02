
        let currentPage = 1;
        const itemsPerPage = 10;
        let data = [];

        async function fetchData() {
            const response = await fetch('https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json');
            data = await response.json();
            renderData();
            renderPageButtons();
            updateButtons();
        }

        function renderData() {
            const container = document.getElementById('data-container');
            container.innerHTML = '';
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const currentPageData = data.slice(startIndex, endIndex);

            currentPageData.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                `;
                container.appendChild(row);
            });
        }

        function renderPageButtons() {
            const pageButtonsContainer = document.getElementById('page-buttons');
            pageButtonsContainer.innerHTML = '';
            const totalPages = Math.ceil(data.length / itemsPerPage);
            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement('button');
                button.textContent = i;
                button.onclick = () => goToPage(i);
                if (i === currentPage) {
                    button.disabled = true;
                }
                pageButtonsContainer.appendChild(button);
            }
        }

        function updateButtons() {
            const totalPages = Math.ceil(data.length / itemsPerPage);
            document.getElementById('prev').disabled = currentPage === 1;
            document.getElementById('next').disabled = currentPage === totalPages;
            document.getElementById('first').disabled = currentPage === 1;
            document.getElementById('last').disabled = currentPage === totalPages;
        }

        function nextPage() {
            if (currentPage < Math.ceil(data.length / itemsPerPage)) {
                currentPage++;
                renderData();
                renderPageButtons();
                updateButtons();
            }
        }

        function prevPage() {
            if (currentPage > 1) {
                currentPage--;
                renderData();
                renderPageButtons();
                updateButtons();
            }
        }

        function goToPage(page) {
            currentPage = page;
            renderData();
            renderPageButtons();
            updateButtons();
        }

        window.onload = fetchData;
