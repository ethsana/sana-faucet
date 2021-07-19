import './App.scss';
import Api from "./utils/http";
import toast from "./utils/toast";
import Logo from './images/sana-logo.png';
import {useEffect, useMemo, useState, useCallback} from "react";

function App() {
  const [value, setValue] = useState('');
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const address = useMemo(() => {
    return value.trim()
  }, [value]);

  useEffect(() => {
    setSuccess(false);
  }, [address])

  const error = useMemo(() => {
    return address && !(/^0x[0-9a-fA-F]{40}$/).test(address);
  }, [address]);

  const onSubmit = useCallback(async () => {
    if(!error && address) {
      try{
        setPending(true);
        const data = await Api.post('/v1/faucet', {ethereumAddress: address});

        if (data.code === 200) {
          setValue('');
          setTimeout(() => {
            setSuccess(true);
          }, 50)
        } else {
          toast(data.msg || 'Failed');
        }
        setPending(false);
      }catch (_){
        toast('Network Error');
        setPending(false);
      }
    }
  }, [address, error])

  return (
      <div className="app">
        <div className='wrapper'>
          <header>
            <img src={Logo} alt="SANA"/>
            <h1>SANA Testnet Authenticated Faucet</h1>
          </header>
          <p className='tips'>Fill out your test wallet address to receive 50,001 rSANA<br />Token Contract: <span>0x28cE46D7Ad420ADeBa62d8F682bE0c84d57111B7</span></p>
          <div className={`input${error ? ' error-input' : ''}`}>
            <input disabled={pending} type="text" placeholder='Test wallet address...' value={value} onChange={(e) => {
              setValue(e.target.value);
            }}/>
            <button disabled={pending || !address || error} onClick={onSubmit}>SUBMIT</button>
          </div>
          {error && <p className='error'>The address is incorrect</p>}
          <div className='network'>Goerli</div>
          <p className={`success ${success ? ' show': ''}`}>🎉 Token has been launched, please check the wallet.</p>
        </div>
      </div>
  );
}

export default App;
