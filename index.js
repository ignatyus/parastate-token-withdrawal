const
    contractAddress = '0xcf331422cc488882c7be03eff8b1f3b7683f26b8',

    contractAbi = [
        {
            name: 'withdrawAll',
            type: 'function',
            inputs: [],
            outputs: [],
            stateMutability: 'nonpayable',
        },
    ],

    connectMetaMask = async () => {
        if (!window.ethereum)
            return alert('Please install MetaMask first.');

        const
            provider = new ethers.providers.Web3Provider(window.ethereum),

            signer = await new Promise((res) => {
                window.ethereum.request({method: 'eth_requestAccounts'})
                    .then(() => {
                        res(provider.getSigner())
                    })
                    .catch((error) => {
                        console.error('Error connecting to MetaMask:', error)
                    })
            })

        return signer
    },

    withdrawAll = async () => {
        const
            signer = await connectMetaMask(),


            contract =
                new ethers.Contract(contractAddress, contractAbi, signer),

            tx = await contract.withdrawAll()

        console.log('Transaction:', tx)
    }
