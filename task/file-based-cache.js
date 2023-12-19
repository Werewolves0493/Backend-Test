const fs = require('fs');
const path = require('path');

class FileBasedCache {
    cacheDirectory;

    constructor(cacheDirectory = './_cache_') {
        this.cacheDirectory = cacheDirectory;
        if (!fs.existsSync(this.cacheDirectory)) fs.mkdirSync(this.cacheDirectory);
    }

    set(key, value, ttl) {
        const entry = {
            key,
            value,
            ttl,
            created: Date.now(),
        };

        const filePath = path.join(this.cacheDirectory, `${key}.json`);;
        fs.writeFileSync(filePath, JSON.stringify(entry));
    }

    get(key) {
        const filePath = path.join(this.cacheDirectory, `${key}.json`);;

        if (fs.existsSync(filePath)) {
            const entry = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            const currentTime = Date.now();
            const expirationTime = entry.created + entry.ttl * 1000;
            const isEntryExpired = currentTime > expirationTime;

            if (isEntryExpired) {
                this.delete(key);
            } else {
                return entry.value;
            }
        }

        return null;
    }

    delete(key) {
        const filePath = path.join(this.cacheDirectory, `${key}.json`);;
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    clear() {
        fs.readdirSync(this.cacheDirectory).forEach((file) => {
            const filePath = path.join(this.cacheDirectory, file);
            fs.unlinkSync(filePath);
        });
    }
}

module.exports = FileBasedCache;