import { component$, useStore, useTask$, useVisibleTask$, $, useSignal } from '@builder.io/qwik';
import { Character } from '~/models/characters';
import { addCharacter, deleteCharacter, getCentenaries, getCharacters, getGryffindor, getHufflepuff, getRavenclaw, getSlytherin, updateCharacter } from '~/utils/characters-provider';



export const UsersList = component$(() => {

    const store = useStore<{ characters: Character[] }>({
        characters: []
    })

    const form = useStore({
        id: '',
        name: '',
        lastname: '',
        house: '',
        birth: '',
        role: '',
    })

    const addOrModify = useSignal("Añadir")

    const allcharacters = useSignal("All characters")

    const old_id = useSignal("")

   

    useTask$(async () => {
        console.log("Desde useTask") // se ejecuta en la consola del cmd (servidor)

    })

    useVisibleTask$(async () => {
        console.log("Desde useVisibleTask")
        store.characters = await getCharacters() // se ejecuta en el inspector del navegador (cliente)
    })

    

    const handleSubmit = $(async (event) => {
        event.preventDefault() // evita el comportamiento por defecto
        if (addOrModify.value === 'Añadir') {
            await addCharacter(form)

        } else {
            await updateCharacter(old_id.value, form)
            addOrModify.value = "Añadir"
            console.log(error);
        }

    })

    
    const handleInputChange = $((event: any) => {
        const target = event.target as HTMLInputElement
        form[target.name] = target.value
    })

    const copyForm = $((character: Character) => {
        form.id = character.id;
        form.name = character.name;
        form.lastname = character.lastname;
        form.house = character.house;
        form.birth = character.birth;
        form.role = character.role;
    })

    const cleanForm = $(() => {
        form.id = ""
        form.name = ""
        form.lastname = ""
        form.house = ""
        form.birth = ""
        form.role = ""
    })

    const removeCharacter = $(async (id: string) => {
        await deleteCharacter(id)
        store.characters = await getCharacters()
    })
        

    return (
        <div class="flex-col w-full justify-center">
            <div class="flex w-full justify-center">
                <div class="flex px-6 py-4 bg-gradient-to-r from-slate-600 to-slate-100 opacity-80">
                    <table class="border-separate border-spacing-2">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Name</th>
                                <th>Lastname</th>
                                <th>House</th>
                                <th>Birth</th>
                                <th>Role</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {store.characters.map((character) => (
                                <tr key={character.id}>
                                    <th>{character.id}</th>
                                    <th>{character.name}</th>
                                    <th>{character.lastname}</th>
                                    <th>{character.house}</th>
                                    <th>{character.birth}</th>
                                    <th>{character.role}</th>

                                    <td>
                                        <button onClick$={() => removeCharacter(character.id)} class="bg-red-600">Borrar</button>
                                    </td>
                                    <td>
                                        <button onClick$={() => {
                                            addOrModify.value = 'Modificar';
                                            old_id.value = character.id;
                                            copyForm(character);
                                        }} class="bg-blue-600">
                                            Modificar
                                        </button>

                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <form onSubmit$={handleSubmit}>
                                    <td>
                                        <input name="id" type="text" value={form.id} onInput$={handleInputChange} class="buttonStyle" />
                                    </td>
                                    <td>
                                        <input name="name" type="text" value={form.name} onInput$={handleInputChange} class="buttonStyle" />
                                    </td>
                                    <td>
                                        <input name="lastname" type="text" value={form.lastname} onInput$={handleInputChange} class="buttonStyle" />
                                    </td>
                                    <td>
                                        <label for="house"></label>
                                        <select name="house" id="house" value={form.house} onInput$={handleInputChange} class="buttonStyle">
                                            <option value="" disabled selected>Choose an option</option>
                                            <option value="Gryffindor">Gryffindor</option>
                                            <option value="Hufflepuff">Hufflepuff</option>
                                            <option value="Slytherin">Slytherin</option>
                                            <option value="Ravenclaw">Ravenclaw</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input name="birth" type="date" value={form.birth} onInput$={handleInputChange} class="buttonStyle" />
                                    </td>
                                    <td>
                                        <label for="role"></label>
                                        <select name="role" id="role" value={form.role} onInput$={handleInputChange} class="buttonStyle">
                                            <option value="" disabled selected>Choose an option</option>
                                            <option value="Proffesor">Proffesor</option>
                                            <option value="Auror">Auror</option>
                                            <option value="Student">Student</option>
                                            <option value="Magizoologist">Magizoologist</option>
                                            <option value="Director">Director</option>
                                            <option value="Minister">Minister</option>
                                            <option value="Reporter">Reporter</option>
                                            <option value="DeathEater">Death Eater</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button type="submit" class="bg-green-500">Aceptar</button>
                                    </td>
                                    <td>
                                        <span
                                            style={`visibility: ${addOrModify.value === 'Añadir' ? 'hidden' : 'visible'}`}
                                            onClick$={() => {
                                                addOrModify.value = "Añadir";
                                                cleanForm(); console.log("Cancelar")
                                            }} class="px-2 py-1 cursor-pointer rounded-md text-white bg-slate-600">
                                            Cancelar
                                        </span>
                                    </td>
                                </form>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div >

            <div class="justify-center flex w-full">
                <button
                    class={allcharacters.value === 'All characters' ? 'button-age-highlighted' : 'button-all'}
                    onClick$={async () => { allcharacters.value = 'All characters'; store.characters = await getCharacters() }}>
                    <i class="fa-solid fa-people-group"></i>
                    All characters
                </button>
                <button
                    class={allcharacters.value === 'Gryffindor' ? 'button-age-highlighted' : 'button-red'}
                    onClick$={async () => { allcharacters.value = 'Gryffindor'; store.characters = await getGryffindor() }}>
                    <i class="fa-solid fa-shield-dog"></i>
                    Gryffindor
                </button>
                <button
                    class={allcharacters.value === 'Slytherin' ? 'button-age-highlighted' : 'button-green'}
                    onClick$={async () => { allcharacters.value = 'Slytherin'; store.characters = await getSlytherin() }}>
                    <i class="fa-solid fa-staff-snake"></i>
                    Slytherin
                </button>
                <button
                    class={allcharacters.value === 'Ravenclaw' ? 'button-age-highlighted' : 'button-yellow'}
                    onClick$={async () => { allcharacters.value = 'Ravenclaw'; store.characters = await getRavenclaw() }}>
                    <i class="fa-solid fa-shield-cat"></i>
                    Ravenclaw
                </button>
                <button
                    class={allcharacters.value === 'Hufflepuff' ? 'button-age-highlighted' : 'button-blue'}
                    onClick$={async () => { allcharacters.value = 'Hufflepuff'; store.characters = await getHufflepuff() }}>
                    <i class="fa-solid fa-crow"></i>
                    Hufflepuff
                </button>
                <button
                    class={allcharacters.value === 'Centenaries' ? 'button-age-highlighted' : 'button-old'}
                    onClick$={async () => { allcharacters.value = 'Centenaries'; store.characters = await getCentenaries() }}>
                    <i class="fa-solid fa-person-cane"></i>
                    Centenaries
                </button>
            </div>
        </div >
    )
});

