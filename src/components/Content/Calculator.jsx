import { useState } from "react"
import Results from "./Results"


const Main = props => {

    const [data, setData] = useState({})

    const handleInputChange = e => {
        const field = e.currentTarget
        console.log(field.name, field.value)
    }

    const TextInput = ({ field, text }) => {
        return (
            <label>
                <span>{text}</span>
                <input type="number" value={data[field]} onChange={handleInputChange} />
            </label>
        )
    }


    return (
        <div className='calculator_block'>
            <div className='title_wrapper'>
                <h2>Розрахунок процесів холодної тонколистової прокатки</h2>
            </div>

            <div className='fields_container'>
                <div className='fields_block'>
                    <div className='block_title'>
                        <h2>Інтегральні характеристики напружено-деформованого стану</h2>
                    </div>

                    <label className='field_wrapper'>
                        <span>Довжина зони пластичної формозміни (із урахуванням пружної деформації робочих валків), мм</span>
                        <input type="number" onChange={handleInputChange} name='field' />
                    </label>

                    <label className='field_wrapper'>
                        <span>Сумарна довжина осередку деформації (із урахуванням пружного відновлення смуги), мм</span>
                        <input type="number" onChange={handleInputChange} name='field' />
                    </label>

                    <label className='field_wrapper'>
                        <span>Випередження, %</span>
                        <input type="number" onChange={handleInputChange} name='field' />
                    </label>

                    <label className='field_wrapper'>
                        <span>Окружна (лінійна) швидкість робочих валків, МПа</span>
                        <input type="number" onChange={handleInputChange} name='field' />
                    </label>

                    <label className='field_wrapper'>
                        <span>Сила прокатки, кН</span>
                        <input type="number" onChange={handleInputChange} name='field' />
                    </label>

                    <label className='field_wrapper'>
                        <span>Момент прокатки, кН*м</span>
                        <input type="number" onChange={handleInputChange} name='field' />
                    </label>

                    <label className='field_wrapper'>
                        <span>Потужність прокатки, кВт</span>
                        <input type="number" onChange={handleInputChange} name='field' />
                    </label>
                </div>

                <div className='fields_block'>
                    <div className='block_title'>
                        <h2>Контроль</h2>
                    </div>

                    <label className='field_wrapper'>
                        <span>Задана напруга переднього натягу, МПа</span>
                        <input type="number" onChange={handleInputChange} name='field' />
                    </label>

                    <label className='field_wrapper'>
                        <span>Розрахована напруга переднього натягу, МПа</span>
                        <input type="number" onChange={handleInputChange} name='field' />
                    </label>

                    <label className='field_wrapper'>
                        <span>Відсоток невідповідності заданої та розрахованої напруги преденього натягу, %</span>
                        <input type="number" onChange={handleInputChange} name='field' />
                    </label>

                    <label className='field_wrapper'>
                        <span>Помилка, отримана при знаходженні довжини пружно деформованого контакту металу з валками, %</span>
                        <input type="number" onChange={handleInputChange} name='field' />
                    </label>
                </div>
            </div>

            <div className='calculate_btn_wrapper'>
                <input type="button" value='Розрахувати' />
            </div>


            {/* <Results /> */}

        </div>
    )
}

export default Main