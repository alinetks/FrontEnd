import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Produto from '../../../models/Produto';
import { busca } from '../../../services/Service'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import './ListaProdutos.css';
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/tokens/keysRedux';
import { toast } from 'react-toastify'

function ListaProdutos() {

    const history = useHistory()
    const [produto, setProdutos] = useState<Produto[]>([])
    const token = useSelector<UserState, UserState["tokens"]>(
        (state) => state.tokens
    )


    useEffect(() => {
        if (token == "") {
            toast.error("Você precisa estar logado", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
            history.push("/login")

        }
    }, [token])

    async function getProduto(){
        await busca("/produto/all", setProdutos, {
            headers: {
                'Authorization': token
            }
        })
    }

    useEffect(() => {

        getProduto()
        
    }, [produto.length])

    return (
        <>
            {
                produto.map(produto => (
                    <Box m={2} className='base-produto'>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Aula:
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {produto.nomeMateria}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {produto.descricao}
                                </Typography>                               
                                <Typography variant="body2" component="p">
                                    {produto.agenda}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {produto.valor}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {produto.categoria?.materia}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Box display="flex" justifyContent="center" mb={1.5}>

                                    <Link to={`/formularioProduto/${produto.id}`} className="text-decorator-none" >
                                        <Box mx={1}>
                                            <Button variant="contained" className="marginLeft" size='small' color="primary" >
                                                atualizar
                                            </Button>
                                        </Box>
                                    </Link>
                                    <Link to={`/deletarProduto/${produto.id}`} className="text-decorator-none">
                                        <Box mx={1}>
                                            <Button variant="contained" size='small' color="secondary">
                                                deletar
                                            </Button>
                                        </Box>
                                    </Link>
                                </Box>
                            </CardActions>
                        </Card>
                    </Box>
                ))
            }
        </>)
}

export default ListaProdutos;