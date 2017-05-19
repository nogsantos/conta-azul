import { Veiculo } from '../../src/v1/veiculos/veiculo';

describe('Objeto veículo', () => {
    let veiculo: Veiculo;

    beforeEach(() => {
        veiculo = new Veiculo();
    });

    it('instanciar um objeto do tipo veículo', () => {
        expect(veiculo instanceof Veiculo).toBeTruthy();
    });

});
