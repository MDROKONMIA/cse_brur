import React, { createContext, useContext, useMemo, useReducer } from "react";

const MaterialUI=createContext();

function reducer(state, action){
    switch(action.type){

    }
}

function MaterialUIControllerProvider({children}){
    const initialState={
        darkMode:false,
    }
    const [controller,dispatch]=useReducer(reducer, initialState);
    const value=useMemo(()=>[controller,dispatch],[controller,dispatch])

    return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>
}

function useMaterialUIController() {
    const context = useContext(MaterialUI);

    if (!context) {
        throw new Error(
            "useMaterialUIController should be used inside the MaterialUIControllerProvider."
        );
    }

    return context;
}
export{MaterialUIControllerProvider, useMaterialUIController}