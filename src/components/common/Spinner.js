import {Loader} from '../../assets/icons/icons'


export const Spinner = () => {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '100vw', 
            height: '100vh' 
        }}>
            <Loader />
        </div>
    )
}