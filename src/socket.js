import store from './store';
import { updateMachineInfo } from './store/machine';

const ws = new WebSocket('ws://localhost:1337');

ws.onopen = function open(){
    console.log('WebScoket is established');
};

ws.onmessage = function msg(event){
    console.log(`[SOCKET_DATA] : ${event.data}`);
    
    const { data } = event;
    const msg = JSON.parse(data);

    if(msg){
        console.log(msg.type);
        switch ( msg.type ) {
            case 'HEALTH_UPDATE':
                store.dispatch(updateMachineInfo(
                    msg.id,
                    { health: msg.health }
                ));
                break;
            default:
                console.log('[SOCKET] invalid type');
                break;
        }
    }
};

