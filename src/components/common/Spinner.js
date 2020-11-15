import {Loader} from '../../assets/icons/icons'


export const Spinner = () => {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '100%', 
            height: '100%' 
        }}>
            <Loader />
        </div>
    )
}