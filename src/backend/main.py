from bson import ObjectId
from fastapi import FastAPI, HTTPException

# Para poder utilizar campos con fecha
from datetime import date, datetime

# Pydantic es una librería para validar los datos.
# BaseModel sirve para definir clases para crear los modelos de datos que se van a usar en la API.
from pydantic import BaseModel

from typing import List

# Motor es una versión asíncrona de PyMongo,
# la biblioteca estándar de Python para trabajar con MongoDB.
import motor.motor_asyncio

# Para aceptar peticiones de diferentes dominios.
from fastapi.middleware.cors import CORSMiddleware


# Define el modelo de datos para un usuario utilizando Pydantic.
# Esto ayuda a FastAPI a validar los tipos de datos entrantes.
class Character(BaseModel):
    id: int 
    name: str
    lastname: str
    house: str
    birth: date
    role: str

# Crea la instancia de la aplicación FastAPI
app = FastAPI()

# Lista de origenes permitidos.
origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Método permitidos
    allow_headers=["*"], # Cabeceras permitidas
)

# Cadena de conexión a MongoDB con autenticación
MONGODB_URL = "mongodb://admin:123@mongodb:27017/?authSource=admin"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URL)
db = client.harrypotter

# Endpoint para listar todos los personajes de más de 100 años
@app.get("/characters/centenaries/", response_description="List all centenaries characters", response_model=List[Character])
async def list_centenaries():
    now = datetime.now()

    pipeline = [
        {
            "$project": {
                "id": 1,
                "name": 1,
                "lastname": 1,
                "house": 1,
                "birth": 1,
                "role": 1,
                "age": {
                    "$divide": [
                        {"$subtract": [now, "$birth"]},
                        365 * 24 * 60 * 60 * 1000
                    ]
                }
            }
        },
        {
            "$match": {
                "age":{"$gte": 100}
            }
        }
    ]

    centenaries = await db["characters"].aggregate(pipeline).to_list(1000)
    return centenaries

# Endpoint para listar todos los personajes.
@app.get("/characters/", response_description="List all characters", response_model=List[Character])
async def list_characters():
    characters = await db["characters"].find().to_list(1000)
    return characters

#Endpoint para crear un nuevo personaje
@app.post("/characters/", response_description="Add a new character", response_model=Character) 
async def create_characters(character: Character):
    character_dict = character.dict()
    character_dict["birth"] = datetime.combine(character.birth, datetime.min.time())
    
    # Verificar si el id del personaje ya existe en la base de datos
    existing_character = await db["characters"].find_one({"id": character.id})
    if existing_character is not None:
        # Si el id ya existe, devolver un mensaje de error
        raise HTTPException(status_code=400, detail="Character id already exists")
    
    # Insertar el personaje en la base de datos
    await db["characters"].insert_one(character_dict)
    return character

# Endpoint praa obtener un personajes específico por id.
@app.get("/characters/{id}", response_description="Get a character", response_model=Character)
async def find_character(id: int):
    character = await db["characters"].find_one({"id": id})
    if character is not None:
        return character
    raise HTTPException(status_code=404, detail=f"Character with id {id} not found.")

# Endpoint para borrar un personajes especifico por DNI.
@app.delete("/characters/{id}", response_description="Delete a character", status_code=204)
async def delete_character(id: int):
    delete_result = await db["characters"].delete_one({"id": id})

    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail=f"Character with id {id} not found.")

#Endpoint para actualizar un personajes especifico por id.
@app.put("/characters/{id}", response_description="Update a character by an id", status_code=204)
async def update_character(id: int, character: Character):
    character_dict = character.dict()
    character_dict["birth"] = datetime.combine(character.birth, datetime.min.time())
    await db["characters"].update_one({"id": id}, {"$set": character_dict})
    return character
  
# Endpoint para obtener todos los personajes por la casa Gryffindor
@app.get("/characters/Gryffindor/", response_description="List characters by houses", response_model=List[Character])
async def list_byhouse_gryffindor():
    pipeline = [
        {
            "$project": {
                "id": 1,
                "name": 1,
                "lastname": 1,
                "house": 1,
                "birth": 1,
                "role": 1,
            }
        },
        {
            "$match": {
                "house": {"$regex": "Gryffindor"}
            }
        }
    ]

    list_byhouse_gryffindor = await db["characters"].aggregate(pipeline).to_list(1000)
    return list_byhouse_gryffindor

@app.get("/characters/Slytherin/", response_description="List characters by houses", response_model=List[Character])
async def list_byhouse_slytherin():
    pipeline = [
        {
            "$project": {
                "id": 1,
                "name": 1,
                "lastname": 1,
                "house": 1,
                "birth": 1,
                "role": 1,
            }
        },
        {
            "$match": {
                "house": {"$regex": "Slytherin"}
            }
        }
    ]

    list_byhouse_slytherin = await db["characters"].aggregate(pipeline).to_list(1000)
    return list_byhouse_slytherin

@app.get("/characters/Ravenclaw/", response_description="List characters by houses", response_model=List[Character])
async def list_byhouse_ravenclaw():
    pipeline = [
        {
            "$project": {
                "id": 1,
                "name": 1,
                "lastname": 1,
                "house": 1,
                "birth": 1,
                "role": 1,
            }
        },
        {
            "$match": {
                "house": {"$regex": "Ravenclaw"}
            }
        }
    ]

    list_byhouse_ravenclaw = await db["characters"].aggregate(pipeline).to_list(1000)
    return list_byhouse_ravenclaw

@app.get("/characters/Hufflepuff/", response_description="List characters by houses", response_model=List[Character])
async def list_byhouse_hufflepuff():
    pipeline = [
        {
            "$project": {
                "id": 1,
                "name": 1,
                "lastname": 1,
                "house": 1,
                "birth": 1,
                "role": 1,
            }
        },
        {
            "$match": {
                "house": {"$regex": "Hufflepuff"}
            }
        }
    ]

    list_byhouse_hufflepuff = await db["characters"].aggregate(pipeline).to_list(1000)
    return list_byhouse_hufflepuff

# @app.get("/characters/{role}/", response_description="List characters by role", response_model=List[Character])
# async def list_byrole(role: str):
#     pipeline = [
#         {
#             "$match": {
#                 "role": role 
#             }
#         }
#     ]

#     # Obtener los personajes que coinciden con el rol utilizando el pipeline de agregación
#     list_byrole = await db["characters"].aggregate(pipeline).to_list(1000)
#     return list_byrole
