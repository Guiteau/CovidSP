import { Etarios } from "./etarios";

export class Vaccination {

    ccaa: string;
    dosisAdministradas: bigint;
    dosisEntregadas: bigint;
    dosisEntregadasModerna: bigint;
    dosisEntregadasPfizer: bigint;
    dosisEntregadasAstrazeneca: bigint;
    dosisEntregadasJanssen: bigint;
    dosisPrimeraDosis: bigint;
    dosisPautaCompletada: bigint;
    porcentajeEntregadas: number;
    porcentajePoblacionAdministradas: number;
    porcentajePoblacionPrimeraDosis: number;
    porcentajePoblacionCompletas: number;
    fechaUltRegistro: bigint;
    etarios: Etarios;

    constructor(ccaa: string, dosisAdministradas: bigint, dosisEntregadas: bigint, dosisEntregadasModerna: bigint, dosisEntregadasPfizer: bigint,
        dosisEntregadasAstrazeneca: bigint, dosisEntregadasJanssen: bigint, dosisPrimeraDosis: bigint, dosisPautaCompletada: bigint,
        porcentajeEntregadas: number, porcentajePoblacionAdministradas: number, porcentajePoblacionPrimeraDosis: number, porcentajePoblacionCompletas: number,
        fechaUltRegistro: bigint, etarios: Etarios, ){

        this.ccaa = ccaa;
        this.dosisAdministradas = dosisAdministradas;
        this.dosisEntregadas = dosisEntregadas;
        this.dosisEntregadasModerna = dosisEntregadasModerna;
        this.dosisEntregadasPfizer = dosisEntregadasPfizer;
        this.dosisEntregadasAstrazeneca = dosisEntregadasAstrazeneca;
        this.dosisEntregadasJanssen = dosisEntregadasJanssen;
        this.dosisPrimeraDosis = dosisPrimeraDosis;
        this.dosisPautaCompletada = dosisPautaCompletada;
        this.porcentajeEntregadas = porcentajeEntregadas;
        this.porcentajePoblacionAdministradas = porcentajePoblacionAdministradas;
        this.porcentajePoblacionPrimeraDosis = porcentajePoblacionPrimeraDosis;
        this.porcentajePoblacionCompletas = porcentajePoblacionCompletas;
        this.fechaUltRegistro = fechaUltRegistro;
        this.etarios = etarios;
    
    }

}