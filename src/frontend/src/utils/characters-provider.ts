// Funciones de acceso a la API de usuarios.

import { Character } from "~/models/characters"

// Obtiene todos los caracteres
export const getCharacters = async (): Promise<Character[]>  => {
    try {
        const response = await fetch('http://localhost:8000/characters/')
        const characters = await response.json()
        return characters
    } catch (error) {
        console.error(error)
    }

    return <Character[]><unknown>null
}

// Añade un caracter.
export const addCharacter = async (character: Character)  => {
    try {
        await fetch('http://localhost:8000/characters/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(character),
        })
        
    } catch (error) {
        console.error(error)
    }
}

// Modifica un caracter.
export const updateCharacter = async (id: string, character: Character)  => {
    try {
        await fetch(`http://localhost:8000/characters/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(character),
        })
        
    } catch (error) {
        console.error(error)
    }
}


// Elimina un caracter.
export const deleteCharacter = async (id: string)  => {
    try {
        await fetch(`http://localhost:8000/characters/${id}`,
        {
            method: 'DELETE',
        })
    } catch (error) {
        console.error(error)
    }
}

// Obtiene listado de caracteres por casas
export const getGryffindor = async (): Promise<Character[]>  => {
    try {
        const response = await fetch('http://localhost:8000/characters/Gryffindor/')
        const characters = await response.json()
        return characters
    } catch (error) {
        console.error(error)
    }

    return <Character[]><unknown>null
}

export const getSlytherin = async (): Promise<Character[]>  => {
    try {
        const response = await fetch('http://localhost:8000/characters/Slytherin/')
        const characters = await response.json()
        return characters
    } catch (error) {
        console.error(error)
    }

    return <Character[]><unknown>null
}

export const getRavenclaw = async (): Promise<Character[]>  => {
    try {
        const response = await fetch('http://localhost:8000/characters/Ravenclaw/')
        const characters = await response.json()
        return characters
    } catch (error) {
        console.error(error)
    }

    return <Character[]><unknown>null
}

export const getHufflepuff = async (): Promise<Character[]>  => {
    try {
        const response = await fetch('http://localhost:8000/characters/Hufflepuff/')
        const characters = await response.json()
        return characters
    } catch (error) {
        console.error(error)
    }

    return <Character[]><unknown>null
}
// Obtiene todos los centenarios
export const getCentenaries = async (): Promise<Character[]>  => {
    try {
        const response = await fetch('http://localhost:8000/characters/centenaries/')
        const centenaries = await response.json()
        return centenaries
    } catch (error) {
        console.error(error)
    }

    return <Character[]><unknown>null
}

