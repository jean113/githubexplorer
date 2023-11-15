
import { RepositoryItem } from "./RepositoryItem";
import '../styles/repositories.scss';
import { useEffect, useState } from "react";

interface Repository
{
    name: string;
    description: string;
    html_url:string;
}

export function RepositoryList()
{
    const [repositories, setRepositories] = useState<Repository[]>([]); //lista ou array de repository

    useEffect( () => {
        fetch('https://api.github.com/orgs/rocketseat/repos')
        .then(response => response.json())
        .then(data => setRepositories(data));

    } , []);

    return (
        <>
            <section className="repository-list">
                <h1>Lista de repositórios</h1>
                <ul>   
                    {
                        /**o map retorna dados, foreach não retorna nada
                         * por isso é usado map aqui
                         */
                        repositories.map(repository => {
                            return <RepositoryItem key={repository.name} repository={repository}/>
                        })
                    }
                    
                </ul>
            </section>
        </>
    );
}