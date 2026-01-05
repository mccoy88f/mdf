import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Crea utente admin di default
  const admin = await prisma.user.upsert({
    where: { email: 'admin@mdf.local' },
    update: {},
    create: {
      email: 'admin@mdf.local',
      name: 'Admin',
      posts: {
        create: [
          {
            title: 'Benvenuto in MDF',
            content: 'Questo è il tuo primo post. Modifica o elimina questo contenuto e inizia a creare la tua applicazione!',
            published: true,
          },
        ],
      },
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log(`   Admin user: ${admin.email}`)
  console.log(`   User ID: ${admin.id}`)
  console.log('')
  console.log('🎉 Puoi ora usare l\'applicazione e creare i tuoi dati!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
