import Image from 'next/image';

export default function About() {
  return (
    <main className="content-grid full-width">
      <header className="full-width text-white bg-[#004F44] py-20">
        <h1 className="text-5xl w-1/3 mb-12">
          NextCart is more than an e-commerce website
        </h1>
        <p>Our story begins in a galaxy, far, far away</p>
      </header>
      <section className="full-width bg-gray-200 py-16 space-y-24">
        {/* Story Section */}
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Story</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
              repellat repellendus atque maiores! Beatae culpa hic accusamus
              totam quis distinctio harum rerum voluptate atque consequatur
              aliquam odit dicta, sit necessitatibus eaque corrupti quo, dolor
              tempore nam quibusdam omnis suscipit eum accusantium a. Modi porro
              odit iusto voluptatibus nisi. Voluptas facilis molestias officia
              aperiam, hic, rem soluta, labore repellendus deleniti quibusdam
              nobis accusamus sunt. Qui dolore inventore illum quia enim atque
              esse beatae sequi aperiam est!
            </p>
          </div>
          <div className="order-first lg:order-last">
            <Image
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
              alt="Team collaboration"
              width={600}
              height={400}
              className="rounded-md shadow-md object-cover w-full h-80"
            />
          </div>
        </article>

        {/* Goals Section */}
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="lg:order-first">
            <Image
              src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg"
              alt="Target achievement and business goals"
              width={600}
              height={400}
              className="rounded-md shadow-lg object-cover w-full h-80"
            />
          </div>
          <div className="space-y-6 lg:order-last">
            <h2 className="text-4xl font-bold">Goals</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
              repellat repellendus atque maiores! Beatae culpa hic accusamus
              totam quis distinctio harum rerum voluptate atque consequatur
              aliquam odit dicta, sit necessitatibus eaque corrupti quo, dolor
              tempore nam quibusdam omnis suscipit eum accusantium a. Modi porro
              odit iusto voluptatibus nisi. Voluptas facilis molestias officia
              aperiam, hic, rem soluta, labore repellendus deleniti quibusdam
              nobis accusamus sunt. Qui dolore inventore illum quia enim atque
              esse beatae sequi aperiam est!
            </p>
          </div>
        </article>

        {/* Environment Section */}
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Environment</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
              repellat repellendus atque maiores! Beatae culpa hic accusamus
              totam quis distinctio harum rerum voluptate atque consequatur
              aliquam odit dicta, sit necessitatibus eaque corrupti quo, dolor
              tempore nam quibusdam omnis suscipit eum accusantium a. Modi porro
              odit iusto voluptatibus nisi. Voluptas facilis molestias officia
              aperiam, hic, rem soluta, labore repellendus deleniti quibusdam
              nobis accusamus sunt. Qui dolore inventore illum quia enim atque
              esse beatae sequi aperiam est!
            </p>
          </div>
          <div className="order-first lg:order-last">
            <Image
              src="https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg"
              alt="Environmental sustainability and green practices"
              width={600}
              height={400}
              className="rounded-md shadow-lg object-cover w-full h-80"
            />
          </div>
        </article>
      </section>
    </main>
  );
}
