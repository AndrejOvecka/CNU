import { useForm } from '@mantine/form';
import {
  ActionIcon,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Grid,
  Group,
  NumberInput,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import useIngredients from '../hooks/useIngredients';
import { randomId } from '@mantine/hooks';
import { Trash } from 'tabler-icons-react';
import { SubmitButton } from './SubmitButton';
import { BackButton } from './BackButton';

const { Col } = Grid;

export function RecipeForm({ initialForm, handleSubmit }) {
  const [isGroup, setIsGroup] = useState(false);
  const { ingredientsList, hasError, isLoading } = useIngredients();

  const form = useForm({
    initialValues: initialForm,
  });

  return (
    <Box mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid justify="space-between">
          <Col span={9}>
            <Title>Přidat recept</Title>
          </Col>
          <Col span={1} pl={60}>
            <SubmitButton text="Uložit" />
          </Col>
          <Col span={1} pl={31}>
            <BackButton text={'Zpět'} url={`/`} />
          </Col>
        </Grid>
        <Grid justify="space-between">
          <Col span={5}>
            <TextInput
              required
              label="Název receptu"
              placeholder="Název receptu"
              {...form.getInputProps('title')}
            />
            <Grid>
              <Col span={6}>
                <TextInput
                  label="Příloha"
                  placeholder="Příloha"
                  {...form.getInputProps('sideDish')}
                />
              </Col>
              <Col span={6}>
                <TextInput
                  placeholder="Doba připravy min."
                  label="Doba připravy min."
                  {...form.getInputProps('preparationTime')}
                />
              </Col>
            </Grid>
            <Title order={3} mt={30} mb={10}>
              Přidat ingredienci
            </Title>
            {form.values.ingredients.map((item, index) => (
              <div key={item.key}>
                <Grid>
                  <Col>
                    <Checkbox
                      label="Přidat skupinu"
                      onChange={(e) => setIsGroup(e.currentTarget.checked)}
                      {...form.getListInputProps(
                        'ingredients',
                        index,
                        'isGroup',
                      )}
                    />
                  </Col>
                </Grid>
                <Grid>
                  <Col span={5}>
                    <Autocomplete
                      placeholder="Název"
                      data={ingredientsList}
                      {...form.getListInputProps('ingredients', index, 'name')}
                    />
                  </Col>
                  <Col span={3}>
                    <NumberInput
                      placeholder="Množství"
                      min={0}
                      disabled={item.isGroup}
                      {...form.getListInputProps(
                        'ingredients',
                        index,
                        'amount',
                      )}
                    />
                  </Col>
                  <Col span={3}>
                    <TextInput
                      placeholder="Jednotka"
                      disabled={item.isGroup}
                      {...form.getListInputProps(
                        'ingredients',
                        index,
                        'amountUnit',
                      )}
                    />
                  </Col>
                  <Col span={1}>
                    <ActionIcon
                      mt={3}
                      color="red"
                      variant="hover"
                      onClick={() => form.removeListItem('ingredients', index)}
                    >
                      <Trash size={30} />
                    </ActionIcon>
                  </Col>
                </Grid>
              </div>
            ))}
            <Grid justify="right">
              <Button
                mr={8}
                mt={30}
                mb={10}
                onClick={() =>
                  form.addListItem('ingredients', {
                    name: '',
                    amount: '',
                    amountUnit: '',
                    isGroup: false,
                    key: randomId(),
                  })
                }
              >
                Přidat
              </Button>
            </Grid>
          </Col>
          <Col span={6}>
            <Textarea
              label="Postup"
              placeholder="Postup"
              size="sm"
              autosize
              minRows={18}
              {...form.getInputProps('directions')}
            />
          </Col>
        </Grid>
      </form>
    </Box>

    // <Box sx={{ maxWidth: 600 }} mx="auto">
    //   <form onSubmit={form.onSubmit(handleSubmit)}>
    //     <Grid>
    //       <Col>
    //         <Grid>
    //           <Col>
    //             <TextInput
    //               required
    //               label="Název receptu"
    //               placeholder="Název receptu"
    //               {...form.getInputProps('title')}
    //             />
    //             <Grid pt={15}>
    //               <Col span={6}>
    //                 <TextInput
    //                   label="Příloha"
    //                   placeholder="Příloha"
    //                   {...form.getInputProps('sideDish')}
    //                 />
    //               </Col>
    //               <Col span={6}>
    //                 <TextInput
    //                   placeholder="Doba připravy min."
    //                   label="Doba připravy min."
    //                   {...form.getInputProps('preparationTime')}
    //                 />
    //               </Col>
    //             </Grid>
    //           </Col>
    //           <Col>
    //             <Textarea
    //               label="Postup"
    //               placeholder="Postup"
    //               size="sm"
    //               autosize
    //               minRows={18}
    //               {...form.getInputProps('directions')}
    //             />
    //           </Col>
    //         </Grid>
    //       </Col>
    //       <Col>
    //         <Box>
    //           <Title order={3} mt={30} mb={10}>
    //             Přidat ingredienci
    //           </Title>
    //           {form.values.ingredients.map((item, index) => (
    //             <div key={item.key}>
    //               <Grid>
    //                 <Col>
    //                   <Checkbox
    //                     label="Přidat skupinu"
    //                     onChange={(e) => setIsGroup(e.currentTarget.checked)}
    //                     {...form.getListInputProps(
    //                       'ingredients',
    //                       index,
    //                       'isGroup',
    //                     )}
    //                   />
    //                 </Col>
    //               </Grid>
    //               <Grid>
    //                 <Col span={4}>
    //                   <Autocomplete
    //                     placeholder="Název"
    //                     data={ingredientsList}
    //                     {...form.getListInputProps(
    //                       'ingredients',
    //                       index,
    //                       'name',
    //                     )}
    //                   />
    //                 </Col>
    //                 <Col span={3}>
    //                   <NumberInput
    //                     placeholder="Množství"
    //                     min={0}
    //                     disabled={item.isGroup}
    //                     {...form.getListInputProps(
    //                       'ingredients',
    //                       index,
    //                       'amount',
    //                     )}
    //                   />
    //                 </Col>
    //                 <Col span={3}>
    //                   <TextInput
    //                     placeholder="Jednotka"
    //                     disabled={item.isGroup}
    //                     {...form.getListInputProps(
    //                       'ingredients',
    //                       index,
    //                       'amountUnit',
    //                     )}
    //                   />
    //                 </Col>
    //               </Grid>
    //             </div>
    //           ))}
    //           <Button
    //             onClick={() =>
    //               form.addListItem('ingredients', {
    //                 name: '',
    //                 amount: '',
    //                 amountUnit: '',
    //                 isGroup: false,
    //                 key: randomId(),
    //               })
    //             }
    //           >
    //             Přidat
    //           </Button>
    //         </Box>
    //       </Col>
    //       <Group position="right" mt="md">
    //         <Button type="submit">Submit</Button>
    //       </Group>
    //     </Grid>
    //   </form>
    // </Box>
  );
}
