import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formList } from '@mantine/form';
import { api } from '../api';
import { RecipeForm } from '../components/RecipeForm';
import { randomId } from '@mantine/hooks';

export function AddRecipePage() {
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    console.log('toto je form: ' + JSON.stringify(form));
    try {
      const response = await api.post(`/recipes`, form);
      if (response && response.data) {
        const id = response.data._id;
        navigate(`/recipes/${id}`);
      }
      toast.success('Recept byl úspěšně vytvořen!');
    } catch (errorMessage) {
      setError(true);
      toast.error('Něco se nepovedlo.');
    }
  };

  const initialForm = {
    title: '',
    preparationTime: '',
    sideDish: '',
    directions: '',
    ingredients: formList([
      {
        name: '',
        amount: '',
        amountUnit: '',
        isGroup: false,
        key: randomId(),
      },
    ]),
  };
  return (
    <RecipeForm initialForm={initialForm} handleSubmit={handleSubmit} />

    // <Container size="xl">
    //   <Grid>
    //     <Col span={10}>
    //       <Title order={1} align="left">
    //         Přidat recept
    //       </Title>
    //     </Col>
    //     <Col span={1}>
    //       <SubmitButton handleSubmit={() => handleSubmit()} />
    //     </Col>
    //     <Col span={1}>
    //       <BackButton text={'Zpět'} url={`/`} />
    //     </Col>
    //   </Grid>
    // <Grid justify="space-between" my={30}>
    //   <Col span={5}>
    //     <TextInput
    //       label="Název receptu"
    //       placeholder="Název receptu"
    //       value={recipe.title}
    //       onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
    //     />
    //     <Grid pt={15}>
    //       <Col span={6}>
    //         <TextInput
    //           value={recipe.sideDish}
    //           label="Příloha"
    //           placeholder="Příloha"
    //           onChange={(e) =>
    //             setRecipe({ ...recipe, sideDish: e.target.value })
    //           }
    //         />
    //       </Col>
    //       <Col span={6}>
    //         <TextInput
    //           placeholder="Doba připravy min."
    //           label="Doba připravy min."
    //           value={recipe.preparationTime}
    //           onChange={(e) =>
    //             setRecipe({ ...recipe, preparationTime: e.target.value })
    //           }
    //         />
    //       </Col>
    //     </Grid>
    //       <Title order={3} mt={30} mb={10}>
    //         Přidat ingredienci
    //       </Title>
    //       <Grid>
    //         <Col>
    //           <Checkbox
    //             checked={isGroup}
    //             label="Přidat skupinu"
    //             onChange={(e) => setIsGroup(e.currentTarget.checked)}
    //           />
    //         </Col>
    //       </Grid>
    //       <Grid>
    //         <Col span={4}>
    //           <Autocomplete
    //             placeholder="Název"
    //             value={ingredientName}
    //             onChange={setIngredientName}
    //             data={ingredientsList}
    //           />
    //         </Col>
    //         <Col span={3}>
    //           <NumberInput
    //             placeholder="Množství"
    //             min={0}
    //             disabled={isGroup}
    //             value={ingredientAmount}
    //             onChange={(val) => setIngredientAmount(val)}
    //           />
    //         </Col>
    //         <Col span={3}>
    //           <TextInput
    //             placeholder="Jednotka"
    //             disabled={isGroup}
    //             value={ingredientAmountUnit}
    //             onChange={(e) => setIngredientAmountUnit(e.target.value)}
    //           />
    //         </Col>
    //         <Col span={2}>
    //           <Button onClick={() => handleAddIngredientsToRecipe()}>
    //             Přidat
    //           </Button>
    //         </Col>
    //       </Grid>
    //       <Grid mt={30}>
    //         <Col span={11}>
    //           <IngredientsList
    //             ingredients={ingredients}
    //             handleRemoveIngredient={handleRemoveIngredient}
    //           />
    //         </Col>
    //       </Grid>
    //     </Col>
    //     <Col span={6}>
    //       <Textarea
    //         placeholder="Postup"
    //         size="md"
    //         autosize
    //         minRows={10.3}
    //         value={recipe.directions}
    //         onChange={(e) =>
    //           setRecipe({ ...recipe, directions: e.target.value })
    //         }
    //       />
    //     </Col>
    //   </Grid>
    // </Container>
  );
}
