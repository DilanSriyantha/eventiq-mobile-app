namespace Utils {
    async function wait(timeout: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, timeout);
        });
    }

    export async function waitFor(timeout: number) {
        await wait(timeout);
    }
}

export default Utils;