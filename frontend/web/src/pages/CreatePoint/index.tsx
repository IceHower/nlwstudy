import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react';
import './styles.css';
import logo from '../../assets/logo.svg'; //importa a logo
import {Link, useHistory} from 'react-router-dom'; //importa o link para fazer o path das rotas
import {FiArrowLeft} from 'react-icons/fi'; //importa o icone
import {Map, TileLayer, Marker} from 'react-leaflet'; //importa as biblioteca de mapa
import {LeafletMouseEvent} from 'leaflet'; //importa o evento do mouse da biblioteca de mapa
import axios from 'axios'; //importa o axios para fazer a conexão com a nossa api
import api from '../../services/api';// importa a nossa api
import {ToastContainer, toast, Zoom, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { Container } from './styles';
interface Item { //Define o tipo das variaveis
    id:number,
    title:string,
    image_url: string,
}
interface IBGEUFResponse {
    sigla: string;
}
interface IBGECityResponse {
    nome: string;
}

const CreatePoint: React.FC = () => {
    const history = useHistory();
    const [items, setItems] = useState<Item[]>([]); //Cria um estado items, e ele começa vazio.
    const [ufs, setUfs] = useState<string[]>([]); //Cria um estado das ufs
    const [cities, setCities] = useState<string[]>([]); //Cria um estado das ufs
    const [selectedUf, setSelectedUf] = useState('0'); //Cria um estado para armazenas a uf selecionada
    const [selectedCity, setSelectedCity] = useState('0'); //Cria um estado para armazenas a uf selecionada
    const [selectedPosition, setSelectedPosition] = useState<[number,number]>([0, 0]); //cria um estado para armazenar o posição no mapa
    const [initialPosition, setInitialPosition] = useState<[number,number]>([0, 0]); //cria um estado para armazenar sua posição atual
    const [selectedItems, setSelectedItems] = useState<number[]>([]); //cria um estado para armazenar sua posição atual
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    })

    useEffect(() => {
        api.get('items').then(response => { 
            setItems(response.data);
        }) 
    }, [])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setInitialPosition([position.coords.latitude, position.coords.longitude]);
            setSelectedPosition([position.coords.latitude, position.coords.longitude]); //seta a select como a inicial tbm, para
        })
    }, []);

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);

            setUfs(ufInitials);
        })
    }, []);

    useEffect(() => { //Carregar as cidades toda vez que a uf mudar
        if(selectedUf === '0') {
            
            return
        }
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const cityNames= response.data.map(city => city.nome);
            setCities(cityNames);
        })
    }, [selectedUf]); //essa função vai mudar toda vez q a selectedUf mudar
    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value });

    }
    function handleSelectUf(e: ChangeEvent<HTMLSelectElement>) {
        const uf = e.target.value;
        setSelectedUf(uf);
    }

    function handleSelectCity(e: ChangeEvent<HTMLSelectElement>) {
        const city = e.target.value;
        setSelectedCity(city);
    }
    function handelMapClick(e: LeafletMouseEvent) {
        setSelectedPosition([
            e.latlng.lat,
            e.latlng.lng
        ]);
    }
    /*No codigo abaixo é passado um id do tipo number, referente ao id do item.
     verifica se o item ja foi selecionado, e se for ao clicar novamente remove o item do estado
    */
    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id); // Descobre se o item selecionado e o msm do id
        if(alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);// cria um filtro de items separado que foi selecionado
            setSelectedItems(filteredItems);
        } else {
        setSelectedItems([...selectedItems, id]);
     }
    }

   async function handleSubmit(e: FormEvent) {
        e.preventDefault();// previne a pagina de reinicar toda hora
        const { name, email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;

        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items
        };
        if(data.name === '' || data.email === '' || data.whatsapp === '' || data.city === '0' || data.uf === '0' || data.items.length === 0) { // verifica se os items estao preenchidos
            toast.error('Por favor cadastrar todos os campos', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })
            window.scrollTo(0,0);
        } else {
        console.log(data);
        await api.post('points', data);
        toast.success('Ponto cadastrado com sucesso', {
            position: "top-center",
            autoClose: 1400,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            });
            window.scrollTo(0,0);
        setTimeout(() => history.push('/'), 1500);
        }
        
    }
    
    
    return(
        <div id='page-create-point'>
            <header>
                <img src={logo} alt="Ecoleta"/>
                <Link to='/'>
                    <FiArrowLeft/> 
                    Voltar para home
                </Link>
            </header>

            <ToastContainer draggable={false} transition={Zoom} autoClose={1200} />

           <form onSubmit={handleSubmit}>
               <h1>Cadastro do Ponto de Coleta</h1>

               <fieldset>
                   <legend>
                       <h2>Dados</h2>
                   </legend>

                   <div className="field">
                       <label htmlFor="name">Nome da entidade</label>
                       <input type="text"
                       id="name"
                       name="name"
                       onChange={handleInputChange}
                       placeholder="Digite o nome da entidade"/>
                   </div>

                   <div className="field-group">

                     <div className="field">
                       <label htmlFor="email">E-mail</label>
                       <input type="email"
                       id="email"
                       name="email"
                       onChange={handleInputChange}
                       placeholder="Digite o e-mail da entidade"/>
                     </div>

                      <div className="field">
                       <label htmlFor="whatsapp">WhatsApp</label>
                       <input type="number"
                       id="whatsapp"
                       name="whatsapp"
                       onChange={handleInputChange}
                       placeholder="(XX) XXXXX-XXXX"/>
                     </div>

                   </div>
               </fieldset>

               <fieldset>
                   <legend>
                       <h2>Endereço</h2>
                       <span>Selecione o endereço no mapa</span>
                   </legend>
                   <Map center={initialPosition} zoom={15} onclick={handelMapClick} > 
                       <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                       <Marker position={selectedPosition}/>
                   </Map>
                    <div className="field-group">

                        <div className="field">
                           <label htmlFor="uf">Estado (UF)</label> 
                           <select name="uf" id="uf" value={selectedUf} onChange={handleSelectUf}>
                               <option value="0">Selecione um Estado</option>
                               {ufs.map(uf =>(<option key={uf} value={uf}>{uf}</option>))}
                           </select>
                        </div>

                        <div className="field">
                           <label htmlFor="city">Cidade</label> 
                           <select 
                           name="city" 
                           id="city" 
                           value={selectedCity}
                           onChange={handleSelectCity}>
                               <option value="0">Selecione uma Cidade</option>
                               {cities.map(city =>(<option key={city} value={city}>{city}</option>))}
                           </select>
                        </div>

                    </div>  

               </fieldset>

               <fieldset>
                   <legend>
                       <h2>Itens de Coleta</h2>
                       <span>Selecione um ou mais itens abaixo</span>
                   </legend>
                   <ul className="items-grid">
                       {items.map(item => (
                       <li key={item.id} 
                       onClick={() => handleSelectItem(item.id)}
                       className={selectedItems.includes(item.id) ? 'selected' : ''}>
                            <img src={item.image_url} alt={item.title}/>
                            <span>{item.title}</span>
                        </li>))}
                       
                    </ul>
               </fieldset>
                <button type="submit">Cadastrar o ponto</button>
           </form>
        </div>
    );
}
export default CreatePoint;