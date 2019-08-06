const companyUrl = 'https://acme-users-api-rev.herokuapp.com/api/companies';
const productUrl = 'https://acme-users-api-rev.herokuapp.com/api/products';
const { Component } = React;

class App extends Component{
    constructor(){
        super()
        this.state = {
            companies: [],
            products: [],
        }
    }

    componentDidMount(){
        console.log('componentDidMount')
        Promise.all([
            axios.get(companyUrl), axios.get(productUrl)
        ])
            .then((resps) => resps.map(resp => resp.data))
            .then(([companies, products]) => {
                this.setState({ companies, products})
            })
    }

    render(){
        const { companies, products } = this.state;
        if(companies.length === 0 || products.length === 0){
            return null;
        }
        const companiesList = companies.map( (company, idx) => React.createElement('li', {key: idx}, company.name));
        const productsList = products.map( (product, idx) => React.createElement('li', {key: idx}, product.name));
        const productsUl = React.createElement('ul', null, productsList);
        const companiesUl = React.createElement('ul', null, companiesList);
        const allList = React.createElement('div', { id: 'myList' }, productsUl, companiesUl)
        const title = React.createElement('h1', null, `Acme - We have ${products.length} Products and ${companies.length} Companies`)
        return React.createElement('div', null, title, allList)
    }
}

const root = document.querySelector('#root');
ReactDOM.render(React.createElement(App), root);