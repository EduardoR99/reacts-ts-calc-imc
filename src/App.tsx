import styles from './app.module.css' 
import poweredImage from './assets/images/powered.png'
import leftArrow from './assets/images/leftarrow.png'
import { useState } from 'react'
import { levels, calculateImc, level} from './helpers/imc'
import {GridItem} from './components/gridItem'

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [showItem, setShowItem] = useState<level | null>(null);

  const handleCalculateButton = () => {
    if(heightField && weightField){
      setShowItem(calculateImc(heightField, weightField));
    }else{
      alert('Digite todos os campos.')
    }
  }

  const handleBackButton = () =>{
    setShowItem(null)
    setHeightField(0)
    setWeightField(0)
  }
  return (<div className={styles.main}>
    <header>
      <div className={styles.headerContainer}>
        <img src={poweredImage} width={150} alt="" />

      </div>
    </header>
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <h1>Calcule o seu IMC</h1>
        <p>IMC é a sigla para índice de Massa Corpórea, parâmetro
          adotado pela Organização Mundial da Saúde para calcular
          o peso ideal de cada pessoa.
        </p>
        <input 
        type="number"
        placeholder='Digite a sua altura (Em metros)...'
        value={heightField > 0 ? heightField: ''}
        onChange={e => setHeightField(parseFloat(e.target.value))}
        disabled={showItem ? true : false}
        />
        <input 
        type="number"
        placeholder='Digite o seu peso (Em quilos)...'
        value={weightField > 0 ? weightField: ''}
        onChange={e => setWeightField(parseFloat(e.target.value))}
        disabled={showItem ? true : false}
        />
        <button onClick={handleCalculateButton}
        disabled={showItem ? true : false}>Calcular</button>
      </div>
      <div className={styles.rightSide}>
        {!showItem &&
        <div className={styles.grid}>
          {levels.map((item, key) =>(
            <GridItem key={key} item={item}/>
          ))}
        </div>
        }
        {showItem &&
        <div className={styles.rightBig}>
          <div className={styles.rightArrow} onClick={handleBackButton}>
          <img src={leftArrow} alt="" width={25}/>
          </div>
          <GridItem item={showItem}/>
        </div>
        }
      </div>
    </div>
    <footer>Feito por Eduardo Rodrigues &copy; todos os direitos reservados - 2022</footer>
  </div>);
}

export default App;
