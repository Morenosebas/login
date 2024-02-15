# Usa la imagen base de Node.js
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /src

# Copia los archivos de configuración y las dependencias del proyecto
COPY package.json tsconfig.json /src/

# Instala las dependencias del proyecto
RUN npm install

# Compila el código TypeScript
RUN npm run build

# Copia el resto de los archivos del proyecto
COPY . /src

# Expone el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
