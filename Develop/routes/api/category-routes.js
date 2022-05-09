const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
          model: Product,
          attributes: ['id','product_name','price','stock','category_id']
      },
  ]
  })
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    attributes: { },
    where: {
        id: req.params.id
    },
    include: [
        {
            model: Product,
            attributes: ['id','product_name','price','stock','category_id']
        },
    ]
})
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No categories found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    id: req.body.id,
    category_name: req.body.category_name,
})
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
        category_name: req.body.category_name
    },
    {
        where: {
            id: req.params.id
        }
    }
)
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No category found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
        id: req.params.id
    }
})
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No category found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
