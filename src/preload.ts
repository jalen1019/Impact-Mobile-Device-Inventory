// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('mysql', {
    db: {
        login: async (username: string, password: string) => {
            return await ipcRenderer.invoke('db:login', username, password);
        },
        logout: () => {
            ipcRenderer.invoke('db:logout');
        },
        getUsernames: async () => {
            return await ipcRenderer.invoke('db:getUsernames');
        },
    },
    table: { 
        load: () => {
            return ipcRenderer.invoke('table:load');
        },
    }
})
