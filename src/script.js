        // Variáveis globais
        let produtos = [];
        let currentPage = 1;
        const itemsPerPage = 5;
        let produtoParaExcluir = null;
        let isEditing = false;

        // DOM Elements
        const sidebar = document.querySelector('.sidebar');
        const sidebarToggle = document.getElementById('sidebarToggle');
        const produtoForm = document.getElementById('produtoForm');
        const produtosTable = document.getElementById('produtosTable');
        const searchInput = document.getElementById('searchInput');
        const prevPageBtn = document.getElementById('prevPage');
        const nextPageBtn = document.getElementById('nextPage');
        const pageNumbers = document.getElementById('pageNumbers');
        const paginationInfo = document.getElementById('paginationInfo');
        const confirmModal = document.getElementById('confirmModal');
        const modalConfirmBtn = document.getElementById('modalConfirmBtn');
        const modalCancelBtn = document.getElementById('modalCancelBtn');
        const cancelarBtn = document.getElementById('cancelarBtn');
        const salvarBtn = document.getElementById('salvarBtn');

        // Dashboard elements
        const vendasDia = document.getElementById('vendasDia');
        const contasPagar = document.getElementById('contasPagar');
        const clientesAtivos = document.getElementById('clientesAtivos');

        // Inicialização
        document.addEventListener('DOMContentLoaded', function() {
            // Carrega produtos do localStorage
            loadProdutos();
            
            // Atualiza dashboard
            updateDashboard();
            
            // Configura eventos
            setupEventListeners();
            
            // Renderiza tabela
            renderProdutosTable();
        });

        // Função para carregar produtos do localStorage
        function loadProdutos() {
            const produtosData = localStorage.getItem('produtos');
            if (produtosData) {
                produtos = JSON.parse(produtosData);
            }
        }

        // Função para salvar produtos no localStorage
        function saveProdutos() {
            localStorage.setItem('produtos', JSON.stringify(produtos));
        }

        // Função para atualizar o dashboard
        function updateDashboard() {
            // Simula dados para o dashboard
            const totalVendas = produtos.reduce((sum, produto) => sum + (produto.precoVenda * (produto.estoque * 0.1)), 0);
            const totalContas = produtos.reduce((sum, produto) => sum + (produto.precoCusto * (produto.estoque * 0.3)), 0);
            const totalClientes = Math.floor(produtos.length * 2.5);
            
            vendasDia.textContent = `R$ ${totalVendas.toFixed(2).replace('.', ',')}`;
            contasPagar.textContent = `R$ ${totalContas.toFixed(2).replace('.', ',')}`;
            clientesAtivos.textContent = totalClientes;
        }

        // Função para configurar os event listeners
        function setupEventListeners() {
            // Sidebar toggle para mobile
            sidebarToggle.addEventListener('click', function() {
                sidebar.classList.toggle('active');
            });

            // Formulário de produto
            produtoForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleSaveProduto();
            });

            // Botão cancelar
            cancelarBtn.addEventListener('click', resetForm);

            // Busca de produtos
            searchInput.addEventListener('input', function() {
                currentPage = 1;
                renderProdutosTable();
            });

            // Paginação
            prevPageBtn.addEventListener('click', function() {
                if (currentPage > 1) {
                    currentPage--;
                    renderProdutosTable();
                }
            });

            nextPageBtn.addEventListener('click', function() {
                const totalPages = Math.ceil(getFilteredProdutos().length / itemsPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    renderProdutosTable();
                }
            });

            // Modal de confirmação
            modalConfirmBtn.addEventListener('click', function() {
                if (produtoParaExcluir !== null) {
                    deleteProduto(produtoParaExcluir);
                    produtoParaExcluir = null;
                }
                confirmModal.classList.add('hidden');
            });

            modalCancelBtn.addEventListener('click', function() {
                produtoParaExcluir = null;
                confirmModal.classList.add('hidden');
            });
        }

        // Função para obter produtos filtrados pela busca
        function getFilteredProdutos() {
            const searchTerm = searchInput.value.toLowerCase();
            if (!searchTerm) return produtos;
            
            return produtos.filter(produto => 
                produto.nome.toLowerCase().includes(searchTerm) || 
                (produto.codigo && produto.codigo.toLowerCase().includes(searchTerm)) ||
                (produto.categoria && produto.categoria.toLowerCase().includes(searchTerm))
            );
        }

        // Função para renderizar a tabela de produtos
        function renderProdutosTable() {
            const filteredProdutos = getFilteredProdutos();
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPer
           }
