describe('oneInterface', () => {
    interface Interface {
        a: string;
    }

    it('work', () => {
        const properties: Interface = {
            a: '',
        };
        expect(properties.a).toBe('');
    });
});
