import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserEntity } from '../entities/user.entity';
// import * as fs from 'fs';

export abstract class ConfigServer{

    constructor(){

        const nodeNameEnv = this.createPathEnv( this.nodeEnv );
        
        dotenv.config({
            path: nodeNameEnv,
        });
        
    }

    public getEnviroment( k: string ): string | undefined{
        
        return process.env[ k ];
    
    }

    public getNumberEnv( k: string ): number{
        return Number( this.getEnviroment( k ) );
    }

    public get nodeEnv(): string{
        return this.getEnviroment('NODE_ENV')?.trim() || "";
    }

    public createPathEnv( path: string ): string {
        
        const arrEnv: Array< string > = [ "env" ];

        if( path.length > 0 ){

            const stringToArray = path.split('.');

            arrEnv.unshift( ...stringToArray );

        }

        return "." + arrEnv.join(".");
    }


    public get typeORMConfig(): DataSourceOptions {
        // console.log( '/src/entities/user.entity.ts' );

        // const text = fs.readFileSync( __dirname + '/../entities/user.entity.ts','utf8');

        // console.log( text );
        return {
            type:"mysql",
            host:this.getEnviroment('DB_HOST'),
            port: this.getNumberEnv('DB_PORT'),
            database: this.getEnviroment('DB_DATABASE'),
            username: this.getEnviroment('DB_USER'),
            password: this.getEnviroment('DB_PASSWORD'),
            // Leer todos los archivos archivos con extencion js y ts que tengan el sufijo '.entity'
            // entities: [ __dirname + "/../**/*.entity{.ts,.js}"], 
            entities: [ UserEntity ], 
            migrations: [ __dirname + "/../../migrations/*{.ts,.js}"],
            synchronize: true,
            logging: false,
            namingStrategy: new SnakeNamingStrategy(),
        }
    
    }

}