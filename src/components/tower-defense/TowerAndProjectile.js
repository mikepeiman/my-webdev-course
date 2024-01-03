class Projectile {
    constructor(x, y, targetX, targetY, speed = 1) {
        this.x = x;
        this.y = y;
        this.target = { x: targetX, y: targetY };
        this.speed = speed;
    }

    update() {
        // Calculate the direction towards the target
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Move towards the target
        this.x += dx / distance * this.speed;
        this.y += dy / distance * this.speed;

        // Check if the projectile is out of bounds
        if (
            this.x < 0 ||
            this.y < 0 ||
            this.x > window.innerWidth ||
            this.y > window.innerHeight
        ) {
            return false;
        }

        return true;
    }
}

class Tower {
    constructor(x, y, level = 1, damage = 10, firingRate = 1) {
        this.x = x;
        this.y = y;
        this.level = level;
        this.damage = damage;
        this.firingRate = firingRate;
        this.health = 100;
        this.projectiles = [];
        this.active = false;
        this.shotsFired = 0;
        this.firing = false;
    }

    update() {
        if (this.firing) {
            this.shotsFired++;
            if (this.shotsFired % this.firingRate === 0) {
                this.shoot();
            }
        }

        this.projectiles = this.projectiles.filter((projectile) => projectile.update());
    }

    shoot() {
        // Add a new projectile targeting a random position
        this.projectiles.push(new Projectile(
            this.x,
            this.y,
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight
        ));
    }

    toggleFiring() {
        this.firing = !this.firing;
        this.update()
    }
}

export { Projectile, Tower };