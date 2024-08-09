
class Service {

    private services: Map<string, any>;

    constructor() {
        this.services = new Map()
        this.initializeService()
    }

    initializeService() {
        for (const [key, service] of Object.entries(this.services)) {
            this.services.set(key, service);
        }
    }
    
    get(serviceName: string)
    { 
        return this.services.get(serviceName);
    }

    make(serviceName: string)
    {
        if (this.get(serviceName)) return this.get(serviceName);

        return;
    }

    // typeDI
}