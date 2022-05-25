import { CONSTANTS } from "../services/constants/constants";

const DatabaseScript = `
CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.INSUMOS} (
    id INTEGER NOT NULL,
    codArticulo DECIMAL(10,0) NULL DEFAULT NULL,
    descripcion CHAR(100) NULL DEFAULT NULL,
    unidadMedidaId CHAR(20) NULL DEFAULT NULL,
    monedaId INTEGER NOT NULL DEFAULT '1',
    codRubro DECIMAL(8,0) NULL DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.TAREAS} (
    id INTEGER NOT NULL,
    codigo INT,
    tipo VARCHAR(1),
    descripcion VARCHAR(30),
    indicadorInsumo VARCHAR(1),
    precio DECIMAL(10,4),
    tipoPrecio VARCHAR(15),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.COTIZACIONES} (
    id INTEGER NOT NULL,
    fecha VARCHAR(20),
    monedaId INTEGER,
    valorCompra DECIMAL(10,2),
    valorVenta DECIMAL(10,2),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.ESTABLECIMIENTOS} (
    id INTEGER NOT NULL,
    codigo INTEGER,
    nombre VARCHAR(50),
    latitud VARCHAR(50),
    longitud VARCHAR(50),
    PRIMARY KEY (codigo)
);

CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.LOTES} (
    id INTEGER NOT NULL,
    codigo INTEGER,
    nombre VARCHAR(50),
    superficie DECIMAL(8,4),
    codEstablecimiento INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY(codEstablecimiento) REFERENCES ${CONSTANTS.TABLES.ESTABLECIMIENTOS}(codigo)
);

CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.DEPOSITOS} (
    id INTEGER NOT NULL,
    codDeposito INTEGER,
    descripcion VARCHAR(50),
    trazabilidad BOOLEAN,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.SUBRUBROS} (
    id INTEGER NOT NULL,
    codRubro INTEGER,
    codSubRubro INTEGER,
    descripcion VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.CONCEPTOS} (
    id INTEGER NOT NULL,
    codigo INTEGER,
    valorUnitario DECIMAL(8,2),
    descripcion VARCHAR(50),
    tipoCalculo VARCHAR(1),
    PRIMARY KEY (codigo)
);

CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.CUENTAS} (
    id INTEGER NOT NULL,
    codigo INTEGER,
    descripcion VARCHAR(50),
    PRIMARY KEY (codigo)
);

CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.EMPLEADOS} (
    id INTEGER NOT NULL,
    codigo INTEGER,
    nombre VARCHAR(50),
    jornal INTEGER,
    legajo INTEGER,
    codConcepto INTEGER,
    activo VARCHAR(1),
    PRIMARY KEY (id),
    FOREIGN KEY(codConcepto) REFERENCES ${CONSTANTS.TABLES.CONCEPTOS}(codigo)
);

CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.MAQUINARIAS} (
    id INTEGER NOT NULL,
    codigo INTEGER,
    descripcion VARCHAR(50),
    empresa INTEGER,
    habilitada VARCHAR(1),
    tipo VARCHAR(2),
    tipoDescripcion VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.CONTRATISTAS} (
    id INTEGER NOT NULL,
    codigo INTEGER,
    nombre VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.EMPRESAS} (
    id INTEGER NOT NULL,
    codigo INTEGER,
    nombre VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.EMPRESAS_SERVICIOS} (
    id INTEGER NOT NULL,
    codigo INTEGER,
    descripcion VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.IMPUTA_A} (
    id VARCHAR(1) NOT NULL,
    descripcion VARCHAR(50),
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.LABORES} (
    id INTEGER NOT NULL,
    fecha VARCHAR(20),
    codArea INTEGER,
    codLote INTEGER,
    codTarea INTEGER,
    propia VARCHAR(1),
    codContratista INTEGER,
    observacionesTarea VARCHAR(50),
    usuario VARCHAR(50),
    fechaCarga VARCHAR(30),
    precioTarea INTEGER,
    observacionesMaquina VARCHAR(50),
    tipo VARCHAR(1),
    nroOrdentrabajo INTEGER,
    cantidad DECIMAL(18,5),
    parteNum INTEGER,
    codPeriodo VARCHAR(20),
    codLoteActividad INTEGER,
    codEstablecimiento INTEGER,
    imputa VARCHAR(3),
    isSync BOOLEAN,
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.LABORES_INSUMOS} (
    id INTEGER NOT NULL,
    laborId INTEGER,
    codArticulo INTEGER,
    codDeposito INTEGER,
    laborMaquinariaId INTEGER,
    cantidad INTEGER,
    dosis INTEGER,
    tipo VARCHAR(2),
    PRIMARY KEY (id),
    FOREIGN KEY(laborId) REFERENCES ${CONSTANTS.TABLES.LABORES}(id)
);

CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.LABORES_PERSONALES} (
    id INTEGER NOT NULL,
    laborId INTEGER,
    codEmpleado INTEGER,
    codConcepto INTEGER,
    legajo VARCHAR(5),
    cantidad INTEGER,
    tarifa INTEGER,
    importe INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY(laborId) REFERENCES ${CONSTANTS.TABLES.LABORES}(id)
);

CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.LABORES_MAQUINARIAS} (
    id INTEGER NOT NULL,
    laborId INTEGER,
    maquinariaCod INTEGER,
    empresaCod INTEGER,
    horasMaquinaria INTEGER,
    kilometraje INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY(laborId) REFERENCES ${CONSTANTS.TABLES.LABORES}(id)
);

CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.PERIODOS} (
    id INTEGER NOT NULL,
    codigo DECIMAL(10,0),
    descripcion VARCHAR(50),
    fechaDesde VARCHAR(20),
    fechaHasta VARCHAR(20),
    isActive BOOLEAN,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.LOTE_ACTIVIDAD} (
    id INTEGER NOT NULL,
    codigo DECIMAL(10,0),
    codActividad DECIMAL(10,0),
    codPeriodo DECIMAL(10,0),
    codEstablecimiento DECIMAL(10,0),
    codLote DECIMAL(10,0),
    descripcion VARCHAR(100),
    superficie DECIMAL(18,5),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.ORDENES_DE_TRABAJO} (
    id INTEGER NOT NULL,
    fecha VARCHAR(20),
    fechaCarga VARCHAR(30),
    codArea INTEGER,
    codEstablecimiento INTEGER,
    codLote INTEGER,
    codTarea INTEGER,
    propia VARCHAR(1),
    codContratista INTEGER,
    observacionesTarea VARCHAR(50),
    usuario VARCHAR(50),
    horaCarga VARCHAR(10),
    precioTarea INTEGER,
    cotizacionDolar VARCHAR(10),
    precioTareaDolar INTEGER,
    observacionesMaquina VARCHAR(50),
    cantidad DECIMAL(18,5),
    tipo VARCHAR(1),
    supervisor INTEGER,
    tecnico INTEGER,
    justificacion VARCHAR(200),
    ejecutada VARCHAR(1),
    numero INTEGER,
    codLoteActividad INTEGER,
    codPeriodo INTEGER,
    isSync BOOLEAN,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.ORDENES_DE_TRABAJO_INSUMOS} (
    id INTEGER NOT NULL,
    ordenTrabajoId INTEGER,
    codArticulo INTEGER,
    codDeposito INTEGER,
    cantidad INTEGER,
    dosis INTEGER,
    tipo VARCHAR(2),
    ordenTrabajoMaquinaId INTEGER,    
    PRIMARY KEY (id),
    FOREIGN KEY(ordenTrabajoId) REFERENCES ${CONSTANTS.TABLES.ORDENES_DE_TRABAJO}(id)
);

CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.ORDENES_DE_TRABAJO_PERSONALES} (
    id INTEGER NOT NULL,
    ordenTrabajoId INTEGER,
    codConcepto INTEGER,
    codEmpleado INTEGER,
    cantidad DECIMAL(18,5),
    precio INTEGER,
    importe INTEGER,
    legajo VARCHAR(5),
    PRIMARY KEY (id),
    FOREIGN KEY(ordenTrabajoId) REFERENCES ${CONSTANTS.TABLES.ORDENES_DE_TRABAJO}(id)
);

CREATE TABLE IF NOT EXISTS ${CONSTANTS.TABLES.GENERIC_SYNCS} (
    id INTEGER NOT NULL,
    fecha VARCHAR(30),
    PRIMARY KEY (id)
);
`;

export default DatabaseScript;
