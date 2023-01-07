// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('mysql', {
    dbLogin: async (username: string, password: string) => {
        return await ipcRenderer.invoke('dbLogin', username, password);
    },
    dbLogout: () => {
        ipcRenderer.invoke('dbLogout');
    }
})
